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
 * Servlet implementation class InsertServlet
 */
@WebServlet("/InsertServlet")
public class InsertServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
    public InsertServlet() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Invoice getDetails = new Invoice();
		Crud fetchData = new Crud();
		int result = 0;
		//String dynamicQuery=;
		
		try {
			getDetails.setBusinessCode(request.getParameter("businessCode"));
			getDetails.setCustNumber(Integer.parseInt(request.getParameter("custNumber")));
			getDetails.setClearDate(request.getParameter("clearDate"));
			getDetails.setBuisnessYear(Integer.parseInt(request.getParameter("buisnessYear")));
			getDetails.setDocId(request.getParameter("docId"));
			getDetails.setPostingDate(request.getParameter("postingDate"));
			getDetails.setDocumentCreateDate(request.getParameter("documentCreateDate"));
			getDetails.setDueInDate(request.getParameter("dueInDate"));
			getDetails.setInvoiceCurrency(request.getParameter("invoiceCurrency"));
			getDetails.setDocumentType(request.getParameter("documentType"));
			getDetails.setPostingId(Integer.parseInt(request.getParameter("postingId"))); 	 
			getDetails.setTotalOpenAmount(Double.parseDouble(request.getParameter("totalOpenAmount")));
			getDetails.setBaselineCreateDate(request.getParameter("baselineCreateDate"));
			getDetails.setCustPaymentTerms(request.getParameter("custPaymentTerms"));
			getDetails.setInvoiceId(Integer.parseInt(request.getParameter("invoiceId")));
			
		
				//System.out.println("inside try");
		
			result = fetchData.insertData(getDetails);
			response.getWriter().print(result);
		}
		catch(Exception e){
			
			System.out.println("error occured");
			e.printStackTrace();
		}
	}

}
