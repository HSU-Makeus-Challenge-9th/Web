import { useEffect, useState } from "react";
import { useRouter, type ViewProps } from "../router/hash-router";

export function Home() {
  const { navigate } = useRouter();
  return (
    <>
      <h1>Home</h1>
      <p>
        라이브러리 없이 <strong>Hash Router</strong>만으로 구현한 SPA
        데모입니다.
      </p>
      <div className="card">
        <div className="row">
          <button className="btn" onClick={() => navigate("/about")}>
            About으로 이동
          </button>
          <button
            className="btn"
            onClick={() => navigate("/docs/getting-started#install")}
          >
            Docs로 이동 (#install)
          </button>
        </div>
        <p className="muted">
          아래로 스크롤 후 뒤/앞으로가기를 눌러 스크롤 복원을 확인해보세요.
        </p>
        <div
          style={{
            height: 900,
            background: "linear-gradient(#f9fafb,#eef2ff)",
          }}
        />
      </div>
    </>
  );
}

export function About() {
  return (
    <>
      <h1>About</h1>
      <p>
        <code>location.hash</code>를 사용하여 <code>file://</code> 환경에서도
        동작합니다.
      </p>
      <ul>
        <li>
          동적 파라미터:{" "}
          <a data-link href="#/users/7">
            #/users/7
          </a>
        </li>
        <li>
          404 처리:{" "}
          <a data-link href="#/nope">
            #/nope
          </a>
        </li>
      </ul>
    </>
  );
}

export function User({ params }: ViewProps) {
  const { id } = params;
  const { navigate } = useRouter();
  return (
    <>
      <h1>User #{id}</h1>
      <p>동적 경로 파라미터를 정규식으로 파싱해 전달합니다.</p>
      <div className="row">
        <button
          className="btn"
          onClick={() => navigate(`/users/${Number(id) + 1}`)}
        >
          다음 사용자로
        </button>
        <button
          className="btn"
          onClick={() => navigate("/", { replace: true })}
        >
          홈으로 (replace)
        </button>
      </div>
    </>
  );
}

export function Docs({ params }: ViewProps) {
  const { slug } = params;
  return (
    <>
      <h1>Docs: {slug}</h1>
      <p>
        <code>/docs/:slug</code> 형태 예시. 해시는 주소창에 그대로 남습니다.
      </p>
    </>
  );
}

export function Guarded() {
  const [on, setOn] = useState(localStorage.getItem("hasAuth") === "1");
  useEffect(() => {
    localStorage.setItem("hasAuth", on ? "1" : "0");
  }, [on]);

  return (
    <>
      <h1>Guarded</h1>
      <p>이 페이지는 로그인 필요하다고 가정합니다.</p>
      <div className="card">
        <div className="row">
          <button className="btn" onClick={() => setOn((v) => !v)}>
            로그인 토글
          </button>
          <span className="muted">
            현재 로그인: <code>{String(on)}</code>
          </span>
        </div>
      </div>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <h1>404 Not Found</h1>
      <p>요청한 경로에 해당하는 페이지가 없습니다.</p>
      <p>
        <a data-link href="#/">
          홈으로
        </a>
      </p>
    </>
  );
}
