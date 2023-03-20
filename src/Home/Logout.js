import axios from 'axios'
export default function Logout(props: { logoutClicked: () => void }) {
    let logoutClicked = () => {
        axios.post("http://localhost:8000/signout",{}, {withCredentials: true}).then((res) => {window.location.href = "/";console.log(res)}).catch((err) => {console.log(err)})
    };

    return (
        <div
            style={{
                display: "flex",
                height: "70px",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingLeft: "75px",
                paddingRight: "75px",
            }}
        >
            <div
                onClick={logoutClicked}
                style={{
                    display: "flex",
                    width: "116px",
                    height: "42px",
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "bold",
                }}
            >
                SIGN OUT
            </div>
        </div>
    );
}
