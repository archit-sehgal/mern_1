import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
const coursesState = atom({
  key: "coursesState",
  default: [],
});

function UpdateCourse() {
  const { coursetitle } = useParams();
  // const [courses, setCourses] = useState([]);
  const setCourses = useSetRecoilState(coursesState);
  useEffect(() => {
    fetch("http://localhost:3000/courses", {
      method: "GET",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setCourses(data);
      });
    });
  }, []);

  return (
    <div className="updatecoursediv flex">
      <div className="heading_update flex">
        <h1>{coursetitle}</h1>
      </div>
      <div className="update_content flex">
        <GetCourse coursetitle={coursetitle} />
        <AddInput coursetitle={coursetitle} />
      </div>
    </div>
  );
}
function GetCourse(props) {
  const [courses] = useRecoilState(coursesState);
  let course = null;
  if (courses && courses.length > 0) {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].title === props.coursetitle) {
        course = courses[i];
      }
    }
  }
  if (!course) {
    return <div>loading..</div>;
  }
  return (
    <div>
      <div className="SingleCourse flex updatesinglecourse">
        <h1>{course.title}</h1>
        <p>{course.desc}</p>
        <span style={{color:"white"}}>{course.price}/-</span>
      </div>
    </div>
  );
}

function AddInput(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [courses, setCourses] = useRecoilState(coursesState);
  return (
    <div className=" updateform flex">
      Title-
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type="text"
      />
      Description-
      <input
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        type="text"
      />
      Price-
      <input
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        type="text"
      />
      <button
        onClick={() => {
          fetch("http://localhost:3000/admin/courses/" + props.coursetitle, {
            method: "POST",
            body: JSON.stringify({
              title: title,
              desc: desc,
              price: price,
            }),
            headers: {
              "content-type": "application/json",
              authorization: "bearer " + localStorage.getItem("token"),
            },
          }).then((res) => {
            res.json().then((data) => {
              let updatedCourses = [];
              if (courses && courses.length > 0) {
                for (let i = 0; i < courses.length; i++) {
                  if (courses[i].title == props.coursetitle) {
                    updatedCourses.push({
                      title: props.coursetitle,
                      desc: desc,
                      price: price,
                    });
                  } else {
                    updatedCourses.push(courses[i]);
                  }
                }
              }
              setCourses(updatedCourses);
            });
          });
        }}
      >
        Update Course
      </button>
    </div>
  );
}
export default UpdateCourse;
