// pages/home/home.tsx

import MainHome from "../../components/ChatHome/MainHome";
import NavBar from "../../components/NavBar/Navbar";


const Home = () => {
  return (
    // <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backfrop-filter backdrop-blur-lg bg-opacity-0 ">
    <div className="flex">
      <NavBar/>
      <MainHome/>
      
    </div>
  );
};

export default Home;

// import React, { useState } from 'react';
// import { Box, AppBar, Toolbar, IconButton, Typography, InputBase, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, TextField, Button } from '@mui/material';
// import { Search as SearchIcon, Send as SendIcon } from '@mui/icons-material';
// import { LogoutButton } from '../../components/LogoutButton';

// const users = [
//   { name: 'King', lastMessage: 'Last message...', avatar: 'https://via.placeholder.com/150' },
//   { name: 'pain', lastMessage: 'Last message...', avatar: 'https://via.placeholder.com/150' },
//   {
//     name: 'Pain',
//     lastMessage: 'Hello ',
//     avatar: 'https://via.placeholder.com/150',
//   }
  
//   // Add more users as needed
// ];

// const Home: React.FC = () => {
//   const [selectedUser, setSelectedUser] = useState(users[0]);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([
//     { sender: 'user', text: 'Hi! What is up??', time: '12:42' }
//   ]);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       setMessages([...messages, { sender: 'user', text: message, time: new Date().toLocaleTimeString() }]);
//       setMessage('');
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
//       <Box sx={{ width: { xs: 80, sm: 300 }, bgcolor: '#2C2C2E', color: '#FFF', display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ p: 2, display: { xs: 'none', sm: 'block' } }}>
//           <InputBase
//             placeholder="Search…"
//             inputProps={{ 'aria-label': 'search' }}
//             startAdornment={<SearchIcon sx={{ mr: 1, color: 'white' }} />}
//             sx={{ width: '100%', color: 'white', bgcolor: '#3A3A3C', borderRadius: 1, p: 1 }}
//           />
//         </Box>
//         <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//           <List>
//             {users.map((user, index) => (
//               <ListItem button key={index} onClick={() => setSelectedUser(user)}>
//                 <ListItemAvatar>
//                   <Avatar alt={user.name} src={user.avatar} />
//                 </ListItemAvatar>
//                 <ListItemText primary={user.name} secondary={user.lastMessage} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//         <Box sx={{ p: 2 }}>
//           <LogoutButton/>
//         </Box>
//       </Box>
//       <Box sx={{ flexGrow: 1, bgcolor: '#1C1C1E', display: 'flex', flexDirection: 'column' }}>
//         <AppBar position="static" sx={{ bgcolor: '#2C2C2E' }}>
//           <Toolbar>
//             <Typography variant="h6">{selectedUser.name}</Typography>
//           </Toolbar>
//         </AppBar>
//         <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
//           {messages.map((msg, index) => (
//             <Box key={index} sx={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', mb: 2 }}>
//               <Avatar alt="User" src="https://via.placeholder.com/150" sx={{ mx: 1 }} />
//               <Box sx={{ maxWidth: '60%', bgcolor: msg.sender === 'user' ? '#0A84FF' : '#3A3A3C', color: 'white', p: 2, borderRadius: 1 }}>
//                 <Typography variant="body2">{msg.text}</Typography>
//                 <Typography variant="caption" sx={{ display: 'block', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.time}</Typography>
//               </Box>
//             </Box>
//           ))}
//         </Box>
//         <Box sx={{ p: 2, bgcolor: '#2C2C2E', display: 'flex' }}>
//           <TextField
//             variant="outlined"
//             fullWidth
//             placeholder="Type here"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             sx={{ bgcolor: '#3A3A3C', borderRadius: 1, mr: 1, input: { color: 'white' } }}
//           />
//           <IconButton color="primary" onClick={handleSendMessage}>
//             <SendIcon />
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Home;
