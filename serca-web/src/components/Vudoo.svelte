<style>
  /* 2000s Style - Retro Font and Text Shadow */
  .retro-font {
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    letter-spacing: 2px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
  }

  /* 2000s Link Styles with Triangle */
  .triangle-link {
    color: #0000FF; /* Blue link color */
    text-decoration: none; /* No underline initially */
    font-weight: bold;
    position: relative;
  }

  .triangle-link:hover {
    text-decoration: underline;
    color: #FFD700; /* Yellow color on hover */
  }

  /* Triangle before and after the link */
  .triangle-link::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid purple; /* Purple triangle */
    margin-right: 5px;
    vertical-align: middle;
  }

  .triangle-link::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid purple; /* Purple triangle */
    margin-left: 5px;
    vertical-align: middle;
  }

  /* Background gradient and text shadow for the container */
  .container {
    background: linear-gradient(45deg, #FF00FF, #00FFFF); /* Neon gradient */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  /* Heading Style */
  h1 {
    font-family: 'Arial', sans-serif;
    font-size: 32px;
    color: #FFD700; /* Neon Yellow */
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }

  /* Paragraph Style */
  p {
    font-family: 'Verdana', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 1.6;
  }

  /* Adding a border and shadow for the entire block */
  .content-block {
    border: 3px solid #FFD700;
    padding: 20px;
    margin-top: 20px;
    background-color: #00008B;
    color: white;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  }
</style>

<div class="container">
  <div class="flex flex-col">
    <h1 class="flex justify-center retro-font">Who are we?</h1>
    <p class="flex justify-center retro-font text-lg">
      We are 
      <a href="https://www.vudoogroup.dev/" class="triangle-link">
        Vudoo Group
      </a> 
      a software and AI startup. This website is our take on early internet websites. Our website is better but... this is cool at least.
    </p>
  </div>

  <div class="content-block">
    <p class="retro-font">
      Wee wee waalllaaa walla
    </p>
  </div>
</div>
