import jsonServer from 'json-server';
import { v4 as uuid } from 'uuid';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node';
import bcypt from 'bcrypt';
import Joi from 'joi';
import fs, { stat } from 'fs';
import { title } from 'process';

const INITALDB = {
  challengeImg: {
    maxLength: 8,
    list: [
      {
        id: 'challenge_img_01',
        imgSrc: 'assets/cooking.png',
        imgAlt: 'A man is cooking',
        type: 'cooking',
      },
      {
        id: 'challenge_img_02',
        imgSrc: 'assets/exercises.png',
        imgAlt: 'A woman is doing yoga',
        type: 'exercises',
      },
      {
        id: 'challenge_img_03',
        imgSrc: 'assets/investment.png',
        imgAlt: 'Money and graphs with a piggy bank',
        type: 'investment',
      },
      {
        id: 'challenge_img_04',
        imgSrc: 'assets/pets.png',
        imgAlt: 'Bunny holding a heart',
        type: 'pets',
      },
      {
        id: 'challenge_img_05',
        imgSrc: 'assets/programmers.png',
        imgAlt: 'A man programming ',
        type: 'programmers',
      },
      {
        id: 'challenge_img_06',
        imgSrc: 'assets/readings.png',
        imgAlt: 'Man reading, sitting on a book ',
        type: 'readings',
      },
      {
        id: 'challenge_img_07',
        imgSrc: 'assets/studys.png',
        imgAlt: 'Study room',
        type: 'studys',
      },
    ],
  },
  users: {
    info: [],
  },
  allChallenge: {
    challengeLength: 0,
    sucessLength: 0,
    failureLength: 0,
  },
};

const adapter = new JSONFile('db.json');
const db = new Low(adapter, INITALDB);
const file = fs.existsSync('db.json');

if (!file) {
  await db.write();
}
await db.read();

const { challengeImg, users, allChallenge } = db.data;

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'backend/',
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// login 부분
server.post('/signin', async (req, res, next) => {
  try {
    const { nick, password } = req.body;
    const signup = await validateLogin(nick, password, password);
    const data = users.info.filter((info) => info.nick == signup.nick);
    if (!data) {
      const { status, message } = errorMessage(400, "일치하는 닉네임이 없습니다.");
      res.status(400).send({ status, message });
      return;
    }
    let matchUserId = '';
    for (let i = 0; i < data.length; i++) {
      const match = await bcypt.compare(password, data[i].password);
      if (match) {
        matchUserId = data[i].userId;
        break;
      }
    }
    if (matchUserId === '') {
      const { status, message } = errorMessage(400, "비밀번호가 일치 하지 않습니다.");
      res.status(400).send({ status, message });
      return;
    }

    const limit = new Date().getTime() + 1000 * 60 * 60;
    const findedUser = users.info.find((item) => item.userId === matchUserId);
    findedUser.limitData = limit;
    await db.write();
    res.status(200).send({ userId: matchUserId, limitData: limit });
  } catch (error) {
    next(error);
  }
});

// signup 생성 부분
server.post('/signup', async (req, res, next) => {
  try {
    const { nick, password, confirm } = req.body;
    const signup = await validateLogin(nick, password, confirm);
    const id = uuid();
    await db.update(({ users }) =>
      users.info.push({
        userId: id,
        nick: signup.nick,
        password: signup.password,
        limitData: 0,
        challengeLength: 0,
        sucessLength: 0,
        failureLength: 0,
        posts: [],
      })
    );
    res.status(200).send({ status: 200, data: { message: "회원가입을 성공하였습니다." } });
  } catch (error) {
    next(error);
  }
})

// posts 가져오기
server.get('/challenge', (req, res, next) => {
  try {
    const { status, userId } = req.query;
    const findedUser = users.info.find((item) => item.userId === userId);
    if (!findedUser) {
      const { status, message } = errorMessage(400, "해당 유저를 찾지 못했습니다.");
      res.status(400).send(status, message);
      return;
    }
    const posts = findedUser.posts.filter((post) => post.status === status);

    res.status(200).send({ posts: posts });
  } catch (error) {
    next(error);
  }
})
// posts 생성
server.post('/challenge', async (req, res, next) => {
  try {
    const { userId, title, type, description, startDate, endDate } = req.body;
    const findedUser = users.info.find((item) => item.userId === userId);
    if (!findedUser) {
      const { status, message } = errorMessage(400, "해당 유저를 찾지 못했습니다.");
      res.status(400).send(status, message);
      return;
    }
    const postId = uuid();

    const newPosts = {
      postId: postId,
      title: title,
      type: type,
      description: description,
      startDate: startDate,
      endDate: endDate,
      status: 'challenge'
    };

    findedUser.posts.push(newPosts);
    findedUser.challengeLength += 1;
    allChallenge.challengeLength += 1;
    await db.write();
    res.status(200).send({ status: 200, data: { message: "챌린지를 등록이 완료되었습니다." } });
  } catch (error) {
    next(error)
  }
});

// 에러 넘김 부분
server.use((error, req, res, next) => {
  console.error(error);
  const { status, message } = errorMessage((error.status || 500), (error.message || '서버 내부 오류가 발생했습니다.'));
  res.status(status).send({ status, message });
});



server.use(router);
server.listen(8080, () => {
  console.log('Server is running on http:localhost:8080');
}).on('error', (e) => {
  console.error('서버를 시작하는 동안 오류가 발생했습니다:', e.message);
})

async function validateLogin(nick, password, confirm) {
  const schema = Joi.object({
    nick: Joi.string().alphanum().min(3).max(8).required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W]).+$/)).required(),
    confirm: Joi.ref('password'),
  });
  try {
    const saltRounds = 10;
    const value = await schema.validateAsync({ nick, password, confirm });
    const hash = await bcypt.hash(value.password, saltRounds);
    return { nick: value.nick, password: hash };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message || 'Failed vailed Error signup');
    }
    throw error;
  }
}

function errorMessage(status, message) {
  return {
    status,
    message,
  };
}
