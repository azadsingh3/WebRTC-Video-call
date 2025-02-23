import React, {useState, useCallback, useEffect} from "react"
import {useSocket} from '../context/SocketProvider';
import {useNavigate} from 'react-router-dom';


const Admin = () => {
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');

    const socket = useSocket()
    const navigate = useNavigate();
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", {email, room});
    }, [email, room, socket]);

    const handleJoinRoom= useCallback((data)=> {
        const {email, room}= data;
        navigate(`/room/${room}`);
    }, [navigate]); 

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);    
        return () => {
            socket.off('room:join',handleJoinRoom);
        }   
    }, [socket, handleJoinRoom]);

    return (
        <div>
            <h1>Admin</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email"> Email ID </label>
                <input 
                   type='email' 
                   id='email' 
                   value={email} 
                   onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <label htmlFor="room"> Room </label>
                <input 
                  type='text' 
                  id='room'
                  value={room} 
                  onChange={(e) => setRoom(e.target.value)}
                  />
                <br/>
                <button>Join</button>
            </form>
        </div>
    )
}
export default Admin;
