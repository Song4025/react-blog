/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {
  
  let [title, setTitle] = useState(['안녕하세요' , '식사하셨습니까', '안녕히계세요']);
  let [changeTitle, setChageTitle] = useState(0);

  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false); // 모달 초기값은 false로 지정

  let [addText, setAddText] = useState('');
  let modalToggle = () => {
    setModal(modal => modal ? false : true);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{fontSize: '20px'}}> React Blog </h4>
      </div>

      {/* <div className='list'>
        <h4><p  onClick={()=>{
          modalToggle();
        }} style={{cursor: 'pointer', display: 'inline'}}>{title[0]}</ p> <span className="like" onClick={() => {
          setLike(like + 1);
        }}>👍</span> {like} </h4>
        <p>4월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{title[1]}</h4>
        <p>4월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{title[2]}</h4>
        <p>4월 17일 발행</p>
      </div> */}

      {
        // 반복문을 사용하고 싶지만 html사이에 for문을 사용할 수 없음.
        title.map(function(parameter, i){
          return (
            <div className='list' key={i}>
              <h4><p  onClick={(e)=>{
                modalToggle()
                setChageTitle(i)
                e.stopPropagation()
              }} style={{cursor: 'pointer', display: 'inline'}}>{title[i]}</ p> 
              <span className="like" onClick={() => {
                let likeCopy = [...like];
                likeCopy[i] = likeCopy[i] + 1;
                setLike(likeCopy);
              }}>👍</span> {like[i]} </h4>
              <p>4월 17일 발행</p>
              <button onClick={()=>{
                let copy = [...title];
                copy.splice(i, 1)
                setTitle(copy)
              }}>삭제</button>
            </div>
          );
        })
      }
      
      {
        // if문은 html중간에 사용할 수 없음. 삼항연산자로 해야함
        // 사용법: 조건식? 참일때 실행 : 거짓일때 실행
        modal == true ? <Modal color={'lightGrey'} 작명={title} setTitle={setTitle} changeTitle={changeTitle} /> : null
        // 작명은 보통 오른쪽이름 그대로 갖다붙임 ex) title={title}
      }

      {/* 
      Component 언제사용?
      1. 반복되는 html태그를 축약할 때.
      2. 큰 페이지들
      3. 자주변경되는 html-ui 들 (성능상 좋을 수 있음)
      */}
      <div>
        <input type="text"  onChange={(e)=>{
          setAddText(e.target.value)
        }}></input>
        <button onClick={()=>{
          let copy = [...title];
          copy.unshift(addText);
          setTitle(copy)
        }}>추가</button>
      </div>
      
      <button onClick={()=>{
        let copy = [...title];
        copy = copy.sort();
        setTitle(copy);
      }}>가나다순정렬</button>

      <button onClick={() => {
        let copy = [...title];
        copy[0] = '변경된제목이다!';
        setTitle(copy);
      }}>타이틀변경</button>

    </div>
  );
}

function Modal(props){
  return (
    <div className='modal' style={{background : props.color}}>
      <h4>{props.작명[props.changeTitle]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        // props로 받아온 텍스트가 변경되게 해주세요.
        let copy = [...props.작명];
        copy[0] = '변경된 제목!!';
        props.setTitle(copy);
      }}>글수정</button>
    </div>
  )
}

export default App;
