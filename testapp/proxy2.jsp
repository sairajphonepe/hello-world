<%@page contentType="application/json; charset=UTF-8"%>

<%@page import="java.io.*" %>
<%@page import="java.net.*" %>

  <%
      String xVerify = request.getParameter("xVerify");
      StringBuilder buffer = new StringBuilder();
      BufferedReader reader = request.getReader();
      String line;
      while ((line = reader.readLine()) != null) {
          buffer.append(line);
      }

      URL url = new URL("https://mercury-stg.phonepe.com/v4/debit");
          // many of these calls can throw exceptions, so i've just
          // wrapped them all in one try/catch statement.

            // create a urlconnection object
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      xVerify = xVerify + "###1";
      try {
      //conn.setDoOutput(true);
      conn.setRequestMethod("POST");
      conn.setRequestProperty("Content-Type", "application/json");
      conn.setRequestProperty("X-VERIFY", xVerify);
      conn.setRequestProperty("Accept", "application/json");
      conn.setDoOutput(true);

      OutputStream os = conn.getOutputStream();
      os.write((buffer.toString()).getBytes());
      os.flush();
      os.close();

      if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
         throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
      }

      String json_response = "";
      InputStreamReader in = new InputStreamReader(conn.getInputStream());
      BufferedReader br = new BufferedReader(in);
      String text = "";
      while ((text = br.readLine()) != null) {
          json_response += text;
        }

      out.println(json_response);
      }
      catch(Exception e)
      {
        e.printStackTrace();
      }
      conn.disconnect();
  %>
