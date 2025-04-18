<script lang="ts">
  import Navbar from "../../components/Navbar.svelte"; // Adjust path if needed
</script>

<Navbar />

<div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: 'Courier New', Courier, monospace; color: #333; background-color: white; border-left: 1px solid #ccc; border-right: 1px solid #ccc; box-shadow: none;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-size: 32px; font-weight: normal; color: #003366; margin-bottom: 10px;">SercaDB</h1>
    <p style="font-size: 16px; font-style: italic; color: #666;">"Built for scale. Designed for chaos."</p>
  </div>

  <!-- Table of Contents -->
  <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; padding: 20px; margin-bottom: 40px; border-radius: 8px;">
    <h2 style="font-size: 18px; font-weight: normal; color: #006666; margin-bottom: 10px;">🧭 Table of Contents</h2>
    <ul style="list-style-type: disc; margin-left: 20px; font-size: 16px; color: #003366;">
      <li><a href="#overview" style="text-decoration: none; color: #003366;">Overview</a></li>
      <li><a href="#architecture" style="text-decoration: none; color: #003366;">Architecture Overview</a></li>
      <li><a href="#api" style="text-decoration: none; color: #003366;">API</a></li>
    </ul>
  </div>

  <!-- Overview -->
  <section id="overview" style="margin-bottom: 40px;">
    <h2 style="font-size: 22px; font-weight: normal; color: #6A1B9A; margin-bottom: 10px;">💾 Overview</h2>
    <p>
      We are managing an expanding database that links media URLs to automatically generated descriptions. 
      As our AI engines produce new descriptions for media content, we continuously update the database by adding new URL-description pairs.
    </p>
  </section>

  <!-- Architecture Overview -->
  <section id="architecture" style="margin-bottom: 40px;">
    <h2 style="font-size: 22px; font-weight: normal; color: #6A1B9A; margin-bottom: 10px;">🛠️ Architecture Overview</h2>
    <p style="font-size: 16px; line-height: 1.8; color: #444;">
      Serca's database is a centralized Sql based database with a Sqlx powered Rust API.
    </p>

    <p>Presently this doesn't mean anything</p>
    <div style="margin-top: 24px; padding: 16px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; white-space: pre-wrap;">
      <code style="font-family: 'Courier New', Courier, monospace;">
        ┌──────────────┐<br/>
        │  Client API  │<br/>
        └─────┬────────┘<br/>
              ↓<br/>
        ┌──────────────┐<br/>
        │ Query Router │<br/>
        └─────┬────────┘<br/>
              ↓<br/>
        ┌──────────────┐<br/>
        │  Compute     │<br/>
        │  Engine      │<br/>
        └─────┬────────┘<br/>
              ↓<br/>
        ┌──────────────┐<br/>
        │  Storage     │<br/>
        │ (LSM + Log)  │<br/>
        └──────────────┘
      </code>
    </div>
  </section>

  <!-- API -->
  <section id="api" style="margin-bottom: 40px;">
    <h2 style="font-size: 22px; font-weight: normal; color: #6A1B9A; margin-bottom: 10px;">📦 API</h2>
    <p>API stuff</p>
  </section>

  <!-- Final Note -->
  <div style="text-align: center; margin-top: 40px;">
    <p style="font-size: 16px; font-style: italic; color: #777;">SQL is magic...</p>
  </div>

</div>

<style>
  a {
    color: #006666;
    text-decoration: none;
  }

  a:hover {
    color: #003366;
    text-decoration: underline;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
  }

  pre {
    background-color: #f4f4f4;
    padding: 1rem;
    overflow-x: auto;
  }

  h2 {
    border-left: 4px solid #6A1B9A;
    padding-left: 10px;
  }

  ul li:hover {
    background-color: #f0f0f0;
  }
</style>
