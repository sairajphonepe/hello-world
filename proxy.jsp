<%@page contentType="application/json; charset=UTF-8"%>

<%@page import="java.io.*" %>
<%@page import="java.net.*" %>

  <%
      StringBuilder content = new StringBuilder();

      	    // many of these calls can throw exceptions, so i've just
      	    // wrapped them all in one try/catch statement.
      	    try
      	    {
      	      // create a url object
      	      String merchantId = request.getParameter("mId");
              String merchantTransactionId = request.getParameter("txnId");
      	      URL url = new URL("http://paymentservice.traefik.stg.phonepe.com/v1/merchants/"+ merchantId + "/" + merchantTransactionId + "/status?details=false");

      	      // create a urlconnection object
      	      URLConnection urlConnection = url.openConnection();

      	      // wrap the urlconnection in a bufferedreader
      	      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

      	      String line;

      	      // read from the urlconnection via the bufferedreader
      	      while ((line = bufferedReader.readLine()) != null)
      	      {
      	        content.append(line + "\n");
      	      }
      	      //out.println(content);
      	      bufferedReader.close();
      	    }
      	    catch(Exception e)
      	    {
      	      e.printStackTrace();
      	    }
      	    out.println(content.toString());
            out.flush();
  %>

