import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState({
    recipient: "",
    subject: "",
    body: "",
    scheduleTime: "",
    recurrence: "none", // Set recurrence to 'none'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await axios.get("http://localhost:3002/api/emails/scheduled-emails");
      setEmails(response.data);
    };

    fetchEmails();
  }, []);

  const handleScheduleEmail = async () => {
    try {
      await axios.post("http://localhost:3002/api/emails/schedule-email", newEmail);
      setEmails([...emails, newEmail]);
      setNewEmail({ recipient: "", subject: "", body: "", scheduleTime: "", recurrence: "none" });
    } catch (error) {
      console.error("Error scheduling email:", error);
    }
  };

  const handleCancelEmail = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/emails/scheduled-emails/${id}`);
      setEmails(emails.filter(email => email._id !== id));
    } catch (error) {
      console.error("Error canceling email:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Email Scheduler</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Schedule a New Email</h3>
          <input
            type="email"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Recipient Email"
            value={newEmail.recipient}
            onChange={(e) => setNewEmail({ ...newEmail, recipient: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Subject"
            value={newEmail.subject}
            onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
          />
          <textarea
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Body"
            value={newEmail.body}
            onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
          />
          <input
            type="datetime-local"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            value={newEmail.scheduleTime}
            onChange={(e) => setNewEmail({ ...newEmail, scheduleTime: e.target.value })}
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleScheduleEmail}
          >
            Schedule Email
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Scheduled Emails</h3>
          <ul>
            {emails.map((email) => (
              <li key={email._id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <p><strong>Recipient:</strong> {email.recipient}</p>
                  <p><strong>Subject:</strong> {email.subject}</p>
                  <p><strong>Schedule Time:</strong> {new Date(email.scheduleTime).toLocaleString()}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleCancelEmail(email._id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
