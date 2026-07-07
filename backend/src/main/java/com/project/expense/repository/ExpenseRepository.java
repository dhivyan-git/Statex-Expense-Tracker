package com.project.expense.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.expense.entity.Expense;
import com.project.expense.entity.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // ================= CRUD =================

    List<Expense> findByUser(User user);

    Optional<Expense> findByIdAndUser(Long id, User user);

    List<Expense> findByTitleContainingIgnoreCaseAndUser(
            String keyword,
            User user);

    List<Expense> findByCategoryIgnoreCaseAndUser(
            String category,
            User user);

    // ================= Dashboard =================

    @Query("""
            SELECT COALESCE(SUM(e.amount),0)
            FROM Expense e
            WHERE e.user = :user
            """)
    Double getTotalExpense(User user);

    @Query("""
            SELECT COUNT(e)
            FROM Expense e
            WHERE e.user = :user
            """)
    Long getTotalTransactions(User user);

    @Query("""
            SELECT COALESCE(MAX(e.amount),0)
            FROM Expense e
            WHERE e.user = :user
            """)
    Double getHighestExpense(User user);

    @Query("""
            SELECT COALESCE(AVG(e.amount),0)
            FROM Expense e
            WHERE e.user = :user
            """)
    Double getAverageExpense(User user);

    // ================= Monthly Chart =================

    @Query(value = """
            SELECT
                MONTHNAME(purchase_date) AS month,
                SUM(amount) AS total
            FROM expenses
            WHERE user_id = :#{#user.id}
            GROUP BY MONTH(purchase_date), MONTHNAME(purchase_date)
            ORDER BY MONTH(purchase_date)
            """, nativeQuery = true)
    List<Object[]> getMonthlyExpense(User user);

    // ================= Category Chart =================

    @Query(value = """
            SELECT
                category,
                SUM(amount)
            FROM expenses
            WHERE user_id = :#{#user.id}
            GROUP BY category
            """, nativeQuery = true)
    List<Object[]> getCategoryExpense(User user);

}