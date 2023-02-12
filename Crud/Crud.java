package com.project.Crud;
import java.sql.*;
import java.util.ArrayList;

import com.project.Pojo.AnalyticsView;
import com.project.Pojo.Invoice;
public class Crud {
	


	public Connection getConnection()
	{
		Connection con = null;
		String url = "jdbc:mysql://localhost:3306/grey_goose";
		String usname = "root";
		String pswd = "harsha10";
		
			try
			{
				Class.forName("com.mysql.cj.jdbc.Driver");
				con=DriverManager.getConnection(url,usname,pswd);
			}
			catch(SQLException e)
			{
				System.out.println("SQL Exception occured");
			}
			catch(ClassNotFoundException e)
			{
				System.out.println("Class not found");
			}
			catch(Exception e)
			{
				System.out.println("Exception occured");
			}
	 
		return con;
	}
	
	public ArrayList<Invoice> showData(int limit)
	{
		ArrayList<Invoice> allInvoice =new ArrayList<Invoice>();
		
		
		 String sql_query="select * from winter_internship limit ?";
		try 
		{
			Connection con = getConnection();
			PreparedStatement pst= con.prepareStatement(sql_query);
			pst.setInt(1, limit );
			ResultSet rs = pst.executeQuery();
			
			while(rs.next())
			{
				Invoice invoiceDetails = new Invoice();
				
				 
				 invoiceDetails.setSlNo(rs.getInt("sl_no"));
				 invoiceDetails.setBusinessCode(rs.getString("business_code"));
				 invoiceDetails.setCustNumber(rs.getInt("cust_number"));
				 invoiceDetails.setClearDate(rs.getString("clear_date"));
				 invoiceDetails.setBuisnessYear(rs.getInt("buisness_year")); 
				 invoiceDetails.setDocId(rs.getString("doc_id"));
				 invoiceDetails.setPostingDate(rs.getString("posting_date"));
				 invoiceDetails.setDocumentCreateDate(rs.getString("document_create_date"));
				 invoiceDetails.setDueInDate(rs.getString("due_in_date"));
				 invoiceDetails.setInvoiceCurrency(rs.getString("invoice_currency"));
				 invoiceDetails.setDocumentType(rs.getString("document_type"));
				 invoiceDetails.setPostingId(rs.getInt("posting_id"));
				 invoiceDetails.setTotalOpenAmount( rs.getDouble("total_open_amount"));
				 invoiceDetails.setBaselineCreateDate(rs.getString("baseline_create_date"));
				 invoiceDetails.setCustPaymentTerms(rs.getString("cust_payment_terms"));
				 invoiceDetails.setInvoiceId(rs.getInt("invoice_id"));
				 invoiceDetails.setAgingBucket(rs.getString("aging_bucket"));				 
				 
				 allInvoice.add(invoiceDetails);
				 
				
			}	 

		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occur");
		}
		
		return allInvoice;

		
	}
	
	public int insertData(Invoice invoice) throws SQLException
	{
		
		String sql_query = "INSERT INTO winter_internship (business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		String customerTableQuery = "INSERT INTO customer (cust_number) VALUES(?)";
		String businessTableQuery = "INSERT INTO business (business_code) VALUES(?)";
		Connection con = getConnection();
		
		PreparedStatement pst = con.prepareStatement(sql_query);
		PreparedStatement pst2 = con.prepareStatement(customerTableQuery);
		PreparedStatement pst3 = con.prepareStatement(businessTableQuery);
		
		 pst2.setInt(1,invoice.getCustNumber()); //For Customer Table because it is a foreign Key in  winter_internship table
		 pst3.setString(1,invoice.getBusinessCode()); //For Business Table because it is a foreign Key in  winter_internship table
		 
		 pst.setString(1,invoice.getBusinessCode());
		 pst.setInt(2,invoice.getCustNumber());
		 
		 if(invoice.getClearDate().isBlank())
			 pst.setNull(3,Types.NULL);
		else
			pst.setString(3, invoice.getClearDate());
			
		 if(invoice.getBuisnessYear()==0)
			 pst.setNull(4,Types.NULL);
		else
			pst.setInt(4, invoice.getBuisnessYear());
		 
		 if(invoice.getDocId().isBlank())
				pst.setNull(5,Types.NULL);
		else
			pst.setString(5, invoice.getDocId());
		
		if(invoice.getPostingDate().isBlank())
			pst.setNull(6,Types.NULL);
		else
			pst.setString(6, invoice.getPostingDate());
		
		if(invoice.getDocumentCreateDate().isBlank())
			pst.setNull(7,Types.NULL);
		else
			pst.setString(7, invoice.getDocumentCreateDate());
		
		if(invoice.getDueInDate().isBlank())
			pst.setNull(8,Types.NULL);
		else
			pst.setString(8, invoice.getDueInDate());
		
		if(invoice.getInvoiceCurrency().isBlank())
			pst.setNull(9,Types.NULL);
		else
			pst.setString(9, invoice.getInvoiceCurrency());
		
		if(invoice.getDocumentType().isBlank())
			pst.setNull(10,Types.NULL);
		else
			pst.setString(10, invoice.getDocumentType());
		
		if(invoice.getPostingId()==0)
			pst.setNull(11,Types.NULL);
		else
			pst.setInt(11, invoice.getPostingId());
		
		if(invoice.getTotalOpenAmount()==0)
			pst.setNull(12,Types.NULL);
		else
			pst.setDouble(12, invoice.getTotalOpenAmount());
		
		if(invoice.getBaselineCreateDate().isBlank())
			pst.setNull(13,Types.NULL);
		else
			pst.setString(13, invoice.getBaselineCreateDate());
		
		if(invoice.getCustPaymentTerms().isBlank())
			pst.setNull(14,Types.NULL);
		else
			pst.setString(14, invoice.getCustPaymentTerms());
		
	
		if(invoice.getInvoiceId()==0)
			pst.setNull(15,Types.NULL);
		else
			pst.setInt(15, invoice.getInvoiceId());
		 
		 
		 
		pst2.executeUpdate();
		pst3.executeUpdate();
		int result = pst.executeUpdate();
		
		return result;
	
	}
	
	public int editData(Invoice invoiceDetails) throws SQLException {
		
		Connection con = getConnection();
		String query = "UPDATE winter_internship SET invoice_currency = ?, cust_payment_terms = ? WHERE sl_no = ?";
		
		PreparedStatement st = con.prepareStatement(query);
		st.setString(1,invoiceDetails.getInvoiceCurrency() );
		st.setString(2, invoiceDetails.getCustPaymentTerms());
		st.setInt(3, invoiceDetails.getSlNo());
		
		
		int result = st.executeUpdate();
		con.close();
		st.close();
		
	return result;	
	}
	
	public int deleteData(Invoice invoiceDetails) throws SQLException {
		
		
		Connection con = getConnection();
		int result = 0;
		String query = "UPDATE winter_internship SET is_deleted='1' WHERE sl_no = ?";
		
		try {
			PreparedStatement st = con.prepareStatement(query);
			st.setInt(1, invoiceDetails.getSlNo());
			
			
			result = st.executeUpdate();
			con.close();
			st.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	return result;	
	}
	
	
	public ArrayList<Invoice> advanceSerach(Invoice invoiceDetails)
	{
		ArrayList<Invoice> allInvoice =new ArrayList<Invoice>();
		
		
		 String sqlQuery="select * from winter_internship";
		 

		
		try 
		{
			Connection con = getConnection();
			
			if(!invoiceDetails.getDocId().isBlank() || !(invoiceDetails.getInvoiceId()==0) || !(invoiceDetails.getCustNumber()==0) || !(invoiceDetails.getBuisnessYear()==0) ) 
					sqlQuery = sqlQuery + " WHERE";
			
			if(!invoiceDetails.getDocId().isBlank())
				sqlQuery = sqlQuery + " doc_id = "+invoiceDetails.getDocId();
					
			if(!(invoiceDetails.getInvoiceId()==0)) {
				if(!invoiceDetails.getDocId().isBlank())
					sqlQuery = sqlQuery + " AND";
				sqlQuery = sqlQuery + " invoice_id = "+invoiceDetails.getInvoiceId();
			}
			
			if(!(invoiceDetails.getCustNumber()==0)) {
				if(!invoiceDetails.getDocId().isBlank() || !(invoiceDetails.getInvoiceId()==0)) {
					sqlQuery = sqlQuery + " AND";
				}
				sqlQuery = sqlQuery + " cust_number = "+ invoiceDetails.getCustNumber();
			}
			
			if(!(invoiceDetails.getBuisnessYear()==0)) {
				if(!invoiceDetails.getDocId().isBlank() || !(invoiceDetails.getInvoiceId()==0) || !(invoiceDetails.getCustNumber()==0)) {
					sqlQuery = sqlQuery + " AND";
				}
				sqlQuery = sqlQuery + " buisness_year = "+ invoiceDetails.getBuisnessYear();
			}
			
			System.out.println(sqlQuery);
			PreparedStatement st= con.prepareStatement(sqlQuery);
			ResultSet rs = st.executeQuery();
			
			while(rs.next())
			{
				Invoice invoiceData = new Invoice();
				
				 
				 invoiceData.setSlNo(rs.getInt("sl_no"));
				 invoiceData.setBusinessCode(rs.getString("business_code"));
				 invoiceData.setCustNumber(rs.getInt("cust_number"));
				 invoiceData.setClearDate(rs.getString("clear_date"));
				 invoiceData.setBuisnessYear(rs.getInt("buisness_year"));
				 invoiceData.setDocId(rs.getString("doc_id"));
				 invoiceData.setPostingDate(rs.getString("posting_date"));
				 invoiceData.setDocumentCreateDate(rs.getString("document_create_date"));
				 invoiceData.setDueInDate(rs.getString("due_in_date"));
				 invoiceData.setInvoiceCurrency(rs.getString("invoice_currency"));
				 invoiceData.setDocumentType(rs.getString("document_type"));
				 invoiceData.setPostingId(rs.getInt("posting_id"));
				 invoiceData.setTotalOpenAmount( rs.getDouble("total_open_amount"));
				 invoiceData.setBaselineCreateDate(rs.getString("baseline_create_date"));
				 invoiceData.setCustPaymentTerms(rs.getString("cust_payment_terms"));
				 invoiceData.setInvoiceId(rs.getInt("invoice_id"));
				 invoiceData.setAgingBucket(rs.getString("aging_bucket"));
				 
				 
				 allInvoice.add(invoiceData);
				 
				
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occur");
		}
		
		return allInvoice;

		
	}
	
	public ArrayList<Invoice> searchField(String custNumber)
	{
		ArrayList<Invoice> allInvoice =new ArrayList<Invoice>();
		
		
		 String sql_query="SELECT * FROM winter_internship WHERE cust_number LIKE ?";
		try 
		{
			Connection con = getConnection();
			PreparedStatement pst= con.prepareStatement(sql_query);
			pst.setString(1,'%' + custNumber +'%');
			ResultSet rs = pst.executeQuery();
			
			while(rs.next())
			{
				Invoice invoiceDetails = new Invoice();
				
				 
				 invoiceDetails.setSlNo(rs.getInt("sl_no"));
				 invoiceDetails.setBusinessCode(rs.getString("business_code"));
				 invoiceDetails.setCustNumber(rs.getInt("cust_number"));
				 invoiceDetails.setClearDate(rs.getString("clear_date"));
				 invoiceDetails.setBuisnessYear(rs.getInt("buisness_year")); 
				 invoiceDetails.setDocId(rs.getString("doc_id"));
				 invoiceDetails.setPostingDate(rs.getString("posting_date"));
				 invoiceDetails.setDocumentCreateDate(rs.getString("document_create_date"));
				 invoiceDetails.setDueInDate(rs.getString("due_in_date"));
				 invoiceDetails.setInvoiceCurrency(rs.getString("invoice_currency"));
				 invoiceDetails.setDocumentType(rs.getString("document_type"));
				 invoiceDetails.setPostingId(rs.getInt("posting_id"));
				 invoiceDetails.setTotalOpenAmount( rs.getDouble("total_open_amount"));
				 invoiceDetails.setBaselineCreateDate(rs.getString("baseline_create_date"));
				 invoiceDetails.setCustPaymentTerms(rs.getString("cust_payment_terms"));
				 invoiceDetails.setInvoiceId(rs.getInt("invoice_id"));
				 
				 
				 allInvoice.add(invoiceDetails);
				 
				
			}

		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occur");
		}
		
		return allInvoice;

		
	}
	
	
	public ArrayList<AnalyticsView> analytics(AnalyticsView chartInvoice){
		ArrayList<AnalyticsView> analyticsList =new ArrayList<AnalyticsView>();
		
		String sqlQuery = "SELECT SUM(total_open_amount) AS sumOfTotalAmount , COUNT(cust_number)  AS countOfCustomers,business_code FROM winter_internship";
		try 
		{
			Connection con = getConnection();
			
			if(!chartInvoice.getStartClearDate().isBlank() ||
					!chartInvoice.getEndClearDate().isBlank() || 
					!chartInvoice.getStartDueDate().isBlank() ||
					!chartInvoice.getEndDueDate().isBlank() ||
					!chartInvoice.getStartBaselineCreateDate().isBlank() ||
					!chartInvoice.getEndBaselineCreateDate().isBlank() ||
					!chartInvoice.getInvoiceCurrency().isBlank()) {
				sqlQuery = sqlQuery +" WHERE";
			}
			
			if(!chartInvoice.getStartClearDate().isBlank() && !chartInvoice.getEndClearDate().isBlank()) {
				sqlQuery = sqlQuery + " clear_date BETWEEN "+ "\'"+chartInvoice.getStartClearDate() +"\'" + " AND " +  "\'" + chartInvoice.getEndClearDate() + "\'";
			}
			
			if(!chartInvoice.getStartDueDate().isBlank() && !chartInvoice.getEndDueDate().isBlank()) {
				if(!chartInvoice.getStartClearDate().isBlank() && !chartInvoice.getEndClearDate().isBlank()) {
					sqlQuery = sqlQuery + " AND";
				}
				sqlQuery = sqlQuery + " due_in_date BETWEEN " + "\'" + chartInvoice.getStartDueDate() + "\'" + " AND " + "\'"+ chartInvoice.getEndDueDate() + "\'";
			}
		
			if(!chartInvoice.getStartBaselineCreateDate().isBlank() && !chartInvoice.getEndBaselineCreateDate().isBlank()) {
				if((!chartInvoice.getStartClearDate().isBlank() && !chartInvoice.getEndClearDate().isBlank()) || (!chartInvoice.getStartDueDate().isBlank() && !chartInvoice.getEndDueDate().isBlank())) {
					sqlQuery = sqlQuery + " AND";
				}
				sqlQuery = sqlQuery + " baseline_create_date BETWEEN " + "\'" + chartInvoice.getStartBaselineCreateDate() + "\'" + " AND " + "\'" +chartInvoice.getEndBaselineCreateDate() + "\'";
			}
			
			if(!chartInvoice.getInvoiceCurrency().isBlank()) {
				if((!chartInvoice.getStartClearDate().isBlank() && !chartInvoice.getEndClearDate().isBlank()) || 
						(!chartInvoice.getStartDueDate().isBlank() && !chartInvoice.getEndDueDate().isBlank()) ||
						(!chartInvoice.getStartBaselineCreateDate().isBlank() && !chartInvoice.getEndBaselineCreateDate().isBlank())) {
					sqlQuery = sqlQuery + " AND";
				}
				sqlQuery = sqlQuery + " invoice_currency = " + "\'" + chartInvoice.getInvoiceCurrency() + "\'"; 
			}
			
			sqlQuery = sqlQuery + " GROUP BY business_code";
			
			System.out.println(sqlQuery);
			
			PreparedStatement pst= con.prepareStatement(sqlQuery);
			
			ResultSet rs = pst.executeQuery();
			
			while(rs.next())
			{
				AnalyticsView chartDetails = new AnalyticsView();
				
				 chartDetails.setSumOfTotalAmount(rs.getDouble("sumOfTotalAmount"));
				 chartDetails.setCountOfCustomers(rs.getInt("countOfCustomers"));
				 chartDetails.setBusinessCode(rs.getString("business_code"));
				 
				 
				 analyticsList.add(chartDetails);
				 
				
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occur");
		}
		
		return analyticsList;

		
	}
		
}
	
	
