import io from "socket.io-client";
import axios from "axios";
const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
const access_token = localStorage.getItem("access_token");
const user = JSON.parse(localStorage.getItem("user"));
axios
    .get(
        process.env.REACT_APP_API_URL +
        `/classroom/all-channel`,
        {
            headers: { Authorization: `Bearer ${access_token}` },
        }
    )
    .then((res) => {
        if (res.status === 200) {
            for (let item of res.data) {
                socket.emit("join_room", "class_" + item.class_id);
            }
            socket.emit("join_room", "class_private_" +  user.id);
        }
    })
    .catch((err) => {
        console.log(err);
    });

export default socket;