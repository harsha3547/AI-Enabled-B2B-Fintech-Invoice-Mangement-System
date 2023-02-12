package com.project.FetchServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.project.Crud.Crud;
import com.project.Pojo.Invoice;

/**
 * Servlet implementation class DeleteServlet
 */
@WebServlet("/DeleteServlet")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public DeleteServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Invoice invoiceDetails = new Invoice();
		int result = 0;
		try {
			
			invoiceDetails.setSlNo(Integer.parseInt(request.getParameter("slNo")));
			
		    Crud fetchData = new Crud();
			
			result = fetchData.deleteData(invoiceDetails);
			response.getWriter().print(result);
	}
	
	catch(Exception e) {
		System.out.println(e);
	}
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
