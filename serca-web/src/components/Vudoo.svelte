<style>
  /* Basic font for simplicity */
  .retro-font {
    font-family: 'Courier New', Courier, monospace; /* Updated to Courier New for the retro vibe */
    font-size: 16px;
    color: #333333; /* Dark grey text color */
    line-height: 1.5;
  }

  /* Link Styles similar to Craigslist (blue and underlined on hover) */
  .simple-link {
    color: #0000EE; /* Blue link color */
    text-decoration: none; /* No underline initially */
  }

  .simple-link:hover {
    text-decoration: underline; /* Underline on hover */
    color: #0000EE; /* Keep blue on hover */
  }

  /* Simple container style */
  .container {
    background-color: #F5F5F5; /* Light grey background */
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #CCCCCC; /* Light grey border */
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  /* Heading Style */
  h1 {
    font-family: 'Courier New', Courier, monospace; /* Updated to Courier New for heading */
    font-size: 24px;
    color: #333333;
    margin-bottom: 10px;
    font-weight: normal;
  }

  /* Paragraph Style */
  p {
    font-family: 'Courier New', Courier, monospace; /* Updated to Courier New for paragraph */
    font-size: 16px;
    color: #333333;
    line-height: 1.6;
  }

  /* Content Block Style */
  .content-block {
    border: 1px solid #DDDDDD;
    padding: 15px;
    background-color: #FFFFFF;
    margin-top: 20px;
    font-size: 16px;
    color: #333333;
    border-radius: 8px;
  }

  /* Simple Button */
  .simple-button {
    background-color: #0074D9; /* Blue button */
    color: white;
    border: 1px solid #0074D9;
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
  }

  .simple-button:hover {
    background-color: #005FA3; /* Darker blue on hover */
    border-color: #005FA3;
  }
</style>

<div class="container">
  <div>
    <h1 class="retro-font">Who are we?</h1>
    <p class="retro-font">
      We are 
      <a href="https://www.vudoogroup.dev/" class="simple-link">
        Vudoo Group
      </a> 
      a software and AI startup. This website is our take on early internet websites. Our website is better, but... this is cool at least.
    </p>
  </div>

  <div class="content-block">
    <p class="retro-font">
      Welcome to the future, where technology and simplicity meet.
    </p>
    <a href="#" class="simple-button">Click Me!</a>
  </div>
</div>
