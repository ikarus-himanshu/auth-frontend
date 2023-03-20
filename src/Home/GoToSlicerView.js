import axios from "axios";

export default function CallAPIView() {
  async function callAPIClicked() {
    let url = "";
    axios
      .post("http://localhost:8000/start-container", { withCredentials: true })
      .then((res) => {
        // url = res.data.container_url;
        console.log(res);
        // console.log(url)
        // window.location = url;
        // window.open(url, "_blank")
        window.open(`http://localhost:3000/slicer?port=${res.data.port}`, "_blank")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div onClick={callAPIClicked} className="sessionButton">
      Go To Super Slicer
    </div>
  );
}
