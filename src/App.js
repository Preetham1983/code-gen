import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(""); // Clear previous response

    try {
      const res = await axios.post("https://code-clyb.onrender.com/askmedical", {
        question,
        context,
      });
      
      // Check if the response contains valid data
      if (res.data && res.data.answer) {
        setResponse(res.data.answer);
      } else {
        setError("No answer received from the backend.");
      }
    } catch (err) {
      setError("Failed to get a response. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Medical Query Assistance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            placeholder="Enter your question here..."
          />
        </div>
        <div>
          <label htmlFor="context">Context:</label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            required
            placeholder="Enter the context here..."
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      <div className="response">
        {loading && <p>Generating response...</p>}
        {response && (
          <div>
            <h3>Response:</h3>
            <pre>
              {response}
            </pre>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;



