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


@WebServlet("/ServletFetch")
public class ServletFetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ServletFetch() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		  Crud fetchData=new Crud();
			int limit = Integer.parseInt(request.getParameter("limit")) ;
				
		    ArrayList<Invoice> data = fetchData.showData(limit);
			  	
			Gson gson = new Gson();
				
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(gson.toJson(data));
		

		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
	}

}
