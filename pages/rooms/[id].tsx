import Layout from "../../components/layout/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from "react";
import { useReducer, useEffect } from 'react';
import { DEFAULT_IMAGE_PATH } from '../../constants/constant';
import { InputText, InputTextarea } from "../../components/form/formField";
import { animateScroll as scroll } from 'react-scroll';

export default function RoomDialog() {

	const [chatContent, setchatContent] = useState([]);
	const [tmpChat, setTmpChat] = useState("");


	const addChat = () => {

		if (tmpChat === "") {
			alert("Please enter the characters!")
			return;
		}

		setchatContent([...chatContent, tmpChat]);
		setTmpChat("");

		var a = document.documentElement;
		var y = a.scrollHeight - a.clientHeight;
		window.scroll(0, y);
	};

	

	const Messages = ({ tmpChat }) => {
		const messagesEndRef = useRef(null);
		const scrollToBottom = () => {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		};
		useEffect(scrollToBottom, [tmpChat]);
	}


	const initalState: number = 0;

	type CountAction = {
		type: string;
		payload: number;
	};

	const [count, dispatch] = useReducer((
		state: number, action: CountAction) => {
		switch (action.type) {
			case 'count/increment':
				return (state + 1 + action.payload);
			default:
				return state;
		}
	},
		initalState
	);

	function handleIncrement() {
		dispatch({
			type: 'count/increment',
			payload: 0
		});
	}

	return (
		<Layout requiredAuth={true}>
			<div className="chat-board-wrapper">
				<div className="chat-board-header">
					<div className="mr-10 mt-10">
						<div className="avatar avatar-72 round"></div>
					</div>
					<div>
						<label className="chat-board-title">ちゃっとるーむ名</label>
						<div className="chat-board-description">説明欄</div>
					</div>
				</div>
			</div>


			<div className="message-line-wrapper">
				<ul>
					{chatContent.map((chat, index) => {
						return (
							<div key={index}>
								<ul className="chat-board-timeline">
									<li className="timeline message">
										<div className="mr-10 mt-10">
											<div className="avatar avatar-32 round"></div>
										</div>
										<div className="message-content">
											<div className="message-header">
												<label>ユーザー名</label>
											</div>
											<div className="message-body">
												{chat}
											</div>
											<div className="message-footer">
												<FontAwesomeIcon icon={faStar} onClick={handleIncrement} /><span>{count}</span>
											</div>
											<div className="message-line"></div>
										</div>
									</li>
								</ul>
							</div>		
						);
					})}
				</ul>
			</div>


			<div className="chat-board-textarea-second">
				<InputTextarea
					name="chat"
					label=""
					value={tmpChat}
					handleChange={e => setTmpChat(e.target.value)}
				/>
				
				<div className="description action btn"><FontAwesomeIcon icon={faPaperPlane} size={"2x"} onClick={addChat} /></div>
			</div>



		</Layout>
	)
}
