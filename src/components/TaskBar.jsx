import React, { useState } from 'react';
import { 
  FaUserCircle, 
  FaCalendarAlt, 
  FaFlag, 
  FaRegCircle, 
  FaCheckCircle, 
  FaPlus 
} from 'react-icons/fa';

const ClickUpList = () => {
    const [tasks, setTasks] = useState([
        {id:1, name: 'Task 1', assigne: "Me", date: "Feb 10",priority:"High",status: 'to-do'},
    ])
}