package com.project.FetchServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.project.Crud.Crud;
import com.project.Pojo.Invoice;


@WebServlet("/EditServlet")
public class EditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    public EditServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		Invoice invoiceDetails = new Invoice();
		int result = 0;
		try {
			invoiceDetails.setInvoiceCurrency(request.getParameter("invoiceCurrency"));
			
			invoiceDetails.setCustPaymentTerms(request.getParameter("custPaymentTerms"));
			
			invoiceDetails.setSlNo(Integer.parseInt(request.getParameter("slNo")));
			
		
			Crud fetchData = new Crud();
			
			result = fetchData.editData(invoiceDetails);
			response.getWriter().print(result);
	}
	
	catch(Exception e) {
		System.out.println(e);
	}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
	}
	}

