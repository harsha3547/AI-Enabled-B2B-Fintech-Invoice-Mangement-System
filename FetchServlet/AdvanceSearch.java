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

/**
 * Servlet implementation class AdvanceSearch
 */
@WebServlet("/AdvanceSearch")
public class AdvanceSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public AdvanceSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Invoice getDetails = new Invoice();
		getDetails.setDocId(request.getParameter("docId"));
		getDetails.setInvoiceId(Integer.parseInt(request.getParameter("invoiceId")));
		getDetails.setCustNumber(Integer.parseInt(request.getParameter("custNumber")));
		getDetails.setBuisnessYear(Integer.parseInt(request.getParameter("buisnessYear")));
		
		Crud fetchData = new Crud();
		ArrayList<Invoice> data = fetchData.advanceSerach(getDetails);
		
		Gson gson = new Gson();
		
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(gson.toJson(data));
	
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		
		
	}

}
