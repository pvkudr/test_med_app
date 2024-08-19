// Import necessary modules from React library
import React, { useEffect } from "react";
import LandingPage from "./Components/Landing_Page/Landing_Page";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SIgn_Up/Sign_Up";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileForm from "./Components/ProfileCard/ProfileCard";

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Function component for the main App
function App() {
  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Notification  - with Navbar component as a child*/}
        <Notification>
          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/instant-consultation"
              element={<InstantConsultation />}
            />
            <Route path="/search-doctors" element={<BookingConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path="/profile" element={<ProfileForm />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
