import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import {Button, Form} from "react-bootstrap";
import api from "../utils/api";

const RegisterPage = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] =useState('')
	const [secPassword, setSecPassword] =useState('')
  const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit= async(e)=>{  // 백엔드로 보내야 되므로 async
		e.preventDefault() // submit은 화면고침되므로 방지
		//보내기전에 유효성검사(특히 패스워드가 동일한지)
    // 에러메시지를 만들 거라서 에러 핸들링할 try catch문
    try{
      if(password !== secPassword){
        throw new Error('패스워드가 일치하지 않습니다. 다시 입력해주세요')
      }

      const newUser = {username: name, email,password}
      // api의 기본주소 //http://localhost:5000/api
      const resp = await api.post('/user', newUser)
      console.log('resp :', resp)
      if(resp.status === 200){
        navigate('/login') // navigate를 통해 이동해야 스테이트정보가 초기화되지 않는다.
      }
    } catch(e){
      setError(e.message)
      setName(''); setEmail(''); setPassword('');setSecPassword('') //초기화 시켜야 제대로 입력값 다시 받을 수 있다.
    }
    
	}

  return (
    <div className="display-center">
      {error && <div className="error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" 
		  	onChange={(e)=> setName(e.target.value)}
		  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
		  	onChange={(e)=> setEmail(e.target.value)}
		  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
		  	onChange={(e)=> setPassword(e.target.value)}
		  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" 
		  	onChange={(e)=> setSecPassword(e.target.value)}
		  />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;