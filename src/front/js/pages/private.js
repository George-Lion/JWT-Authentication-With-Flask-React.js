import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../styles/private.css";

export const Private = () => {
	let history = useHistory()
	const [info, setInfo] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		getInfo()
	}, [])

	const getInfo = async () => {
		const response = fetch("https://3001-4geeksacade-reactflaskh-1n3r28z34jr.ws-eu43.gitpod.io/api/planets", {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token")
			}
		});
		const data = await (await response).json();
		if (data.info) {
			setInfo(data.info);
			setError(null);
		} else if (data.msg) {
			setError(data.msg)
		}

	}
	if (localStorage.getItem("token")) {
		return <div className="text-center mt-5">
			<h1>This is my super page</h1>
			{info.map((planet, i) => {
				return <h2 key={i}>{planet}</h2>
			})}
			<h1>{error}</h1>
		</div>
	} else {
		return <Redirect to="/login"></Redirect>
	}
};
