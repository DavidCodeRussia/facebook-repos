import { useEffect, useState } from 'react';
import * as svg from './assets/svg';
import './App.css';

type Repo = {
  name: string;
  stargazers_count: number;
  forks_count: number;
};

function App() {
  const [repos, setRepos] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let getRepos = async () => {
      setLoading(true);
      let res = await fetch('https://api.github.com/users/facebook/repos');
      if (res.ok) {
        let json = await res.json();
        setRepos(json);
        setLoading(false);
      } else {
        alert('Ошибка HTTP: ' + res.status);
        setLoading(false);
      }
    };
    getRepos();
  }, []);

  return (
    <div className="App">
      <div className="App-header">Repositories facebook</div>
      {loading ? (
        <div className="App-inner">
          <div>loading...</div>
        </div>
      ) : (
        <div className="App-inner">
          {Array.isArray(repos) &&
            repos.map((item, key) => {
              return (
                <div className="App-repo" key={key}>
                  <div className="first-part">
                    <div className="serial-number">{key}.</div>
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="second-part">
                    <div className="stars">
                      <svg.Star />
                      {item.stargazers_count}
                    </div>
                    <div className="forks-wrapper">
                      <div className="forks-header">forks:</div>
                      <div>{item.forks_count}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;
