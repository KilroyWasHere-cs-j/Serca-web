<script lang="ts">
  import Navbar from "../../components/Navbar.svelte"; // Adjust path if needed
</script>

<Navbar />

<div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: 'Courier New', Courier, monospace; color: #333; background-color: white; border-left: 1px solid #ccc; border-right: 1px solid #ccc; box-shadow: none;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-size: 32px; font-weight: normal; color: #003366; margin-bottom: 10px;">SercaDB</h1>
    <p style="font-size: 16px; font-style: italic; color: #666;">"Built for storing video descriptions, capable of storing pie recipes."</p>
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
      Serca's database is a centralized cloud hosted postgres database with a Sqlx powered Rust API. This allows us to leverage the power 
      of TSQL and Rust to build a speedy and safe database experience. 
    </p>

    <br>
    <br>

    <h3 class="text-2xl">Data table peak</h3>
    <p>This is a snipit of our database. Please note that that data in the this table is ust dummy don't put too much stock into it!</p>
    <div style="margin-top: 24px; padding: 16px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; white-space: pre-wrap;">
      <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>URL</th>
                <th>Description</th>
                <th>Special one</th>
                <th>Special two</th>
                <th>Flag</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>0</td>
                <td>https://serca.dev/one</td>
                <td>Something kinda important</td>
                <td>false</td>
                <td>true</td>
                <td>green</td>
            </tr>
            <tr>
                <td>1</td>
                <td>https://serca.dev/two</td>
                <td>People dancing with a dog in a barn</td>
                <td>true</td>
                <td>false</td>
                <td>grey</td>
            </tr>
            <tr>
                <td>2</td>
                <td>https://serca.dev/three</td>
                <td>Kids swiming in a pool</td>
                <td>false</td>
                <td>false</td>
                <td>red</td>
            </tr>
        </tbody>
    </table>
    </div>
  </section>

  <!-- API -->
  <section id="api" style="margin-bottom: 40px;">
    <h2 style="font-size: 22px; font-weight: normal; color: #6A1B9A; margin-bottom: 10px;">📦 API</h2>
    <p>
      Although it's not public available yet we have an API. We will add more information here
      as we build it out and make it public. 
    </p>

    <br>
    <br>

    <!-- <h2>API samples</h2>
    <div class="bg-white border border-gray-300 p-4 font-mono text-sm text-gray-800 shadow-inner">
      <pre>
> https://serca.dev/api/getrec
> 
> "animals"
      </pre>
    </div>
  </section> -->

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

  table {
    width: 50%;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 18px;
    text-align: left;
  }

  table, th, td {
    border: 1px solid black;
  }
  
  th, td {
    padding: 12px;
  }

  th {
    background-color: #f2f2f2;
  }
</style>
