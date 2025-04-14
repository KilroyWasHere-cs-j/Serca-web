<style>
    /* 2000s Gradient Background */
    .blue-yellow-bg {
      background: linear-gradient(45deg, #0057b7 50%, #ffd700 50%);
      background-size: 400% 400%;
      animation: gradient 5s ease infinite;
    }
  
    /* Retro Text with Pixelated Font */
    .pixel-font {
      font-family: "Courier New", monospace;
      font-size: 18px;
      letter-spacing: 2px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
    }
  
    /* Hoverable Link Style */
    .highlighted-link {
      color: #ffd700;
      text-decoration: underline;
      font-weight: bold;
      transition: all 0.3s ease-in-out;
    }
  
    .highlighted-link:hover {
      color: #0057b7;
      text-decoration: none;
      background-color: #ffd700;
      padding: 5px 10px;
      border-radius: 5px;
    }
  
    /* Border Boxes for 2000s Style */
    .retro-box {
      border: 3px solid #ffd700;
      padding: 15px;
      margin: 10px;
      background-color: #0057b7;
      color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  
    /* Animation for Gradient Background */
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  </style>
  
  <div class="flex flex-col m-4 bg-blue-400">
    <!-- Title with retro text and underline -->
    <h1 class="flex justify-center text-4xl text-blue-600 mt-6 font-serif p-2 underline pixel-font">
      Highlighted Sites
    </h1>      
    
    <!-- Content Section with Retro Box and Yellow Background -->
    <div class="flex justify-center p-2 bg-yellow-400 retro-box">
      <ul class="flex flex-col space-y-3">
        <li class="highlighted-link">- Natural language media search</li>
        <li class="highlighted-link">- Supports image, video, and audio formats</li>
        <li class="highlighted-link">- Find content even when metadata is missing</li>
        <li class="highlighted-link">- AI-powered content understanding</li>
        <li class="highlighted-link">- Fast and accurate search results</li>
      </ul>
    </div>
  </div>
  