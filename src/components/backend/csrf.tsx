"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL

function Csrf() {
    fetch(`${API_BASE_URL}/api/csrf/`, {
        credentials: "include",
    })
    return (
        <div></div>
    )
}

export default Csrf