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
import com.project.Pojo.AnalyticsView;

@WebServlet("/AnalyticsViewServlet")
public class AnalyticsViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public AnalyticsViewServlet() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		AnalyticsView getDetails = new AnalyticsView();
		getDetails.setStartClearDate(request.getParameter("startClearDate"));
		getDetails.setEndClearDate(request.getParameter("endClearDate"));
		getDetails.setStartDueDate(request.getParameter("startDueDate"));
		getDetails.setEndDueDate(request.getParameter("endDueDate"));
		getDetails.setStartBaselineCreateDate(request.getParameter("startBaselineCreateDate"));
		getDetails.setEndBaselineCreateDate(request.getParameter("endBaselineCreateDate"));
		getDetails.setInvoiceCurrency(request.getParameter("invoiceCurrency"));
		
		
		Crud fetchData = new Crud();
		ArrayList<AnalyticsView> data = fetchData.analytics(getDetails);
		
		Gson gson = new Gson();
		
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(gson.toJson(data));
		
	}

}
