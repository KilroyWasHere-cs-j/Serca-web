<script>
  export let title = "Important Announcement";
  export let date = "April 17, 2025";
  export let content = "This is a placeholder for the announcement text. Here you can put any important information you'd like to announce!";
</script>

<style>
  /* Early web-style typography, simple and functional */
  :global(body) {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f2f2f2;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .announcement-container {
    width: 80%;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border: 2px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .announcement-title {
    font-size: 24px;
    font-weight: bold;
    color: #2b2b2b;
    text-transform: uppercase;
    margin-bottom: 10px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
  }

  .announcement-meta {
    font-size: 12px;
    color: #888;
    margin-bottom: 20px;
  }

  .announcement-content {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    white-space: pre-line; /* Preserves newlines in content */
  }

  /* Border and spacing similar to early web components */
  .announcement-container {
    border-radius: 4px;
    padding: 15px;
  }

  /* Links should be underlined in a classic early web fashion */
  a {
    color: #0066cc;
    text-decoration: underline;
  }

  a:hover {
    color: #003366;
  }
</style>

<div class="announcement-container">
  <div class="announcement-title">{title}</div>
  <div class="announcement-meta">
    <span>{date}</span> | <a href="#">More info...</a>
  </div>
  <div class="announcement-content">
    {content}
  </div>
</div>
