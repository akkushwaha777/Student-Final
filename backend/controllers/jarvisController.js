const processCommand = async (req, res) => {
  try {
    const { command } = req.body;
    
    if (!command) {
      return res.status(400).json({ message: "No command provided", response: "Please say something." });
    }

    const lowerCmd = command.toLowerCase();
    let responseText = "";
    let action = null;

    // Basic Logic "Brain"
    if (lowerCmd.includes("hello") || lowerCmd.includes("hi")) {
      responseText = "Hello there! I am Jarvis. How can I assist you today?";
    } else if (lowerCmd.includes("time")) {
      responseText = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (lowerCmd.includes("date")) {
      responseText = `Today's date is ${new Date().toLocaleDateString()}`;
    } else if (lowerCmd.includes("open google")) {
      responseText = "Opening Google for you.";
      action = "open_url";
      url = "https://google.com";
    } else if (lowerCmd.includes("open youtube")) {
      responseText = "Opening YouTube.";
      action = "open_url";
      url = "https://youtube.com";
    } else if (lowerCmd.includes("who are you")) {
      responseText = "I am Jarvis, your personal AI assistant.";
    } else {
        // Fallback for unknown commands
        responseText = "I'm not sure how to help with that yet, but I am learning.";
    }

    res.json({
      message: "Success",
      response: responseText,
      action: action,
      url: action === "open_url" ? url : null
    });

  } catch (error) {
    console.error("Jarvis Error:", error);
    res.status(500).json({ message: "Server Error", response: "Something went wrong in my circuits." });
  }
};

module.exports = { processCommand };
