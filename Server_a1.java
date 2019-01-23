/* HTTP Server - 350 Assignment 1

    Server:
        - searches for specified page, returns 404 if it does not exist
        - on an "echo" request, returns all data sent by the browser
        - on a "log" request", returns a list of all requests sent to the browser

 * Austin Heinrich
 * awh055
 * 11177796
 */

import java.io.*;
import java.net.*;
import java.util.ArrayList;

public class Server_a1 {

    public static void main(String[] Args) {
        serve();
    }

    public static void serve() {

        try {
            ArrayList<String> logList = new ArrayList<>();   // keeps track of requests
            ArrayList<String> echoList = new ArrayList<>();  // catches all server info
            BufferedReader request;
            PrintStream response;
            Socket s;

            ServerSocket server = new ServerSocket(80);  // hosting on port 80 aka localhost

            System.out.println("Start:");

            while (true) {
                s = server.accept();

                request = new BufferedReader(new InputStreamReader(s.getInputStream()));
                response = new PrintStream(s.getOutputStream());

                echoList.clear();

                // get full list of server info, which it places in echoList
                String requestedLine = "SHOULD NOT DISPLAY";
                while (requestedLine.length() != 0) {
                    requestedLine = request.readLine();
                    echoList.add(requestedLine);
                }

                String headerLineSplit[] = echoList.get(0).split(" ");  // get the header line, split it by spaces
                String requestedPage = headerLineSplit[1].replaceFirst("/", "");  // remove the leading '/'

                logList.add(requestedPage);  // add the requested page to the continuous log
                logList.remove("favicon.ico");

                response.println("HTTP/1.0 200 OK ");
                response.println("Content-Type: text/html ");
                response.println("");

                response.println(" <html> <body> <a href=\"http://www.usask.ca\"> hello </a> </body> </html> ");
                response.println("");

                // Search the local dictionary for the requested page.
                // If the page can be found, great, send it to the web page. If it can't catch that and send a text-
                //  based 404 error.
                try {
                    BufferedReader fileReader = new BufferedReader(new FileReader(requestedPage));
                    fileReader.lines().forEach(response::println);

                    response.println(" <html> <body> <a href=\"http://www.usask.ca\"> hello </a> </body> </html> ");
                    response.println("");

                } catch (java.io.FileNotFoundException e) {
                    switch(requestedPage) {
                        case "echo":  // return browser data
                            echoList.forEach(response::println);
                            System.out.println("Echo request made.");
                            break;
                        case "log":   // return a list of all requests made to the serve since inception
                            logList.forEach(response::println);
                            System.out.println("Log request made.");
                            break;
                        case "":      // so when "localhost" is entered, it does not return 404
                            logList.add("localhost");  // and make sure this is logged!
                            break;
                        default:      // if there is no command OR the file is not found
                            response.println("404 File Not Found");
                            System.out.println("404 Error.");
                            break;
                    }
                }

                s.close();
            }
        } catch(Exception E) {
            System.out.println(E);
        }
    }
}
