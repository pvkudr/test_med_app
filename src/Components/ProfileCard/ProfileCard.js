// Following code has been commented with appropriate comments for your reference.
// Import necessary modules from React and other files
import React, { useEffect, useState } from "react";
import { API_URL, SERVER_STATUS } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard2.css";

// Define a Function component called ProfileForm
const ProfileForm = () => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Access the navigation functionality from React Router
  const navigate = useNavigate();

  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    console.log("ProfileCard auth 1st check", typeof authtoken);
    if (!authtoken) {
      console.log("ProfileCard auth 2nd check", authtoken);

      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    if (SERVER_STATUS) {
      try {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email"); // Get the email from session storage

        if (!authtoken) {
          navigate("/login");
        } else {
          const response = await fetch(`${API_URL}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${authtoken}`,
              Email: email, // Add the email to the headers
            },
          });
          if (response.ok) {
            const user = await response.json();
            setUserDetails(user);
            setUpdatedDetails(user);
          } else {
            // Handle error case
            throw new Error("Failed to fetch user profile");
          }
        }
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    } else {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("name");
      const phone = sessionStorage.getItem("phone");
      // Get the email from session storage

      if (!authtoken) {
        navigate("/login");
      } else {
        const user = { name: name, email: email, phone: phone };
        console.log("user=", user);

        setUserDetails(user);
        setUpdatedDetails(user);
      }
    }
  };

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (SERVER_STATUS) {
      e.preventDefault();

      try {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email"); // Get the email from session storage

        if (!authtoken || !email) {
          navigate("/login");
          return;
        }

        const payload = { ...updatedDetails };
        const response = await fetch(`${API_URL}/api/auth/user`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "Content-Type": "application/json",
            Email: email,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Update the user details in session storage
          sessionStorage.setItem("name", updatedDetails.name);
          sessionStorage.setItem("phone", updatedDetails.phone);

          setUserDetails(updatedDetails);
          setEditMode(false);
          // Display success message to the user
          alert(`Profile Updated Successfully!`);
          navigate("/");
          // TODO - check how reload works
          window.location.reload();
        } else {
          // Handle error case
          throw new Error("Failed to update profile");
        }
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    } else {
      const authtoken = sessionStorage.getItem("auth-token");

      if (!authtoken) {
        navigate("/login");
        return;
      }

      // Update the user details in session storage
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);

      setUserDetails(updatedDetails);
      setEditMode(false);
      // Display success message to the user
      alert(`Profile Updated Successfully!`);
      navigate("/");
      // TODO - check how reload works
      window.location.reload();
    }
  };

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-container">
      <div className="profile-grid">
        {editMode ? (
          <div className="edit-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  disabled // Disable the email field
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  value={updatedDetails.name}
                  onChange={handleInputChange}
                />
              </label>
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  name="phone"
                  value={updatedDetails.phone}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        ) : (
          <div className="profile-details">
            <h1>Welcome, {userDetails.name}</h1>{" "}
            <div>
              <h3>
                <b>Email:</b>
              </h3>
              <p>{userDetails.email}</p>
            </div>
            <div>
              <h3>
                <b>Phone:</b>
              </h3>
              <p> {userDetails.phone}</p>
            </div>
            <button className="btn" onClick={handleEdit}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the ProfileForm component as the default export
export default ProfileForm;
