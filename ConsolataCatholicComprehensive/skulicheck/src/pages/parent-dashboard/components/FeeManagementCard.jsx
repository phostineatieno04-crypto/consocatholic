import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeeManagementCard = ({ feeData, onPayNow, onViewHistory, onDownloadReceipt }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      paid: 'text-accent bg-accent/10',
      pending: 'text-warning bg-warning/10',
      overdue: 'text-error bg-error/10',
      partial: 'text-secondary bg-secondary/10'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      paid: 'CheckCircle',
      pending: 'Clock',
      overdue: 'AlertTriangle',
      partial: 'MinusCircle'
    };
    return icons[status] || 'Clock';
  };

  return (
    <div className="bg-card border border-border rounded-lg card-elevation">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="CreditCard" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Fee Management</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={14}
            className="text-xs"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="p-6">
        {/* Current Balance */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-foreground mb-2">
            ${feeData.currentBalance.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Current Balance</p>
          {feeData.dueDate && (
            <p className="text-xs text-warning mt-1">
              Due: {new Date(feeData.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">
              ${feeData.totalPaid.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total Paid</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-muted-foreground">
              ${feeData.totalFees.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total Fees</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-4">
          <Button
            variant="default"
            onClick={() => onPayNow(feeData.currentBalance)}
            iconName="CreditCard"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
            disabled={feeData.currentBalance === 0}
          >
            Pay Now
          </Button>
          <Button
            variant="outline"
            onClick={onViewHistory}
            iconName="History"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            History
          </Button>
        </div>

        {/* Recent Transactions */}
        {isExpanded && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Receipt" size={16} className="mr-2" />
              Recent Transactions
            </h4>
            
            {feeData.recentTransactions.length === 0 ? (
              <div className="text-center py-4">
                <Icon name="Receipt" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No recent transactions</p>
              </div>
            ) : (
              <div className="space-y-2">
                {feeData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(transaction.status)}`}>
                        <Icon name={getStatusIcon(transaction.status)} size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.method}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        ${transaction.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                        {transaction.receiptId && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDownloadReceipt(transaction.receiptId)}
                            className="w-6 h-6"
                            title="Download Receipt"
                          >
                            <Icon name="Download" size={12} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Payment Methods */}
        {isExpanded && (
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Payment Methods</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="CreditCard"
                iconPosition="left"
                iconSize={14}
                className="text-xs"
                onClick={() => console.log('Credit Card')}
              >
                Credit Card
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Smartphone"
                iconPosition="left"
                iconSize={14}
                className="text-xs"
                onClick={() => console.log('Mobile Payment')}
              >
                Mobile Pay
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Building"
                iconPosition="left"
                iconSize={14}
                className="text-xs"
                onClick={() => console.log('Bank Transfer')}
              >
                Bank Transfer
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Wallet"
                iconPosition="left"
                iconSize={14}
                className="text-xs"
                onClick={() => console.log('Digital Wallet')}
              >
                E-Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeManagementCard;