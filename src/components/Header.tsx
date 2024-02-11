type HeaderProps = {
  title: string;
};

export default function Header({title}: HeaderProps) {
  return (
    <header>
      <p>{title}</p>
      <ul>
        <li>DashBoard</li>
        <li>로그아웃</li>
      </ul>
    </header>
  );
}
