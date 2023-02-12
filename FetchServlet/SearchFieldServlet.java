package com.project.FetchServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.project.Crud.Crud;
import com.project.Pojo.Invoice;


@WebServlet("/SearchFieldServlet")
public class SearchFieldServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public SearchFieldServlet() {
        super();
      
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		  Crud fetchData=new Crud();
			String custNumber = request.getParameter("custNumber") ;
			//System.out.println(offset);
				
		    ArrayList<Invoice> data = fetchData.searchField(custNumber);
			  	
			Gson gson = new Gson();
			//String respData = gson.toJson(data);
				
			//response.getWriter().print(gson.toJson(data));
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(gson.toJson(data));
		
			
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
