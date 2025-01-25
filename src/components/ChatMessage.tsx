import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType, Product, Supplier } from "@/types/chat";
import { Card } from "./ui/card";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const renderMessageContent = () => {
    if (message.type === 'product' && message.data) {
      const products = Array.isArray(message.data) ? message.data : [message.data];
      const product = products[0] as Product; // Type assertion since we know it's a Product
      return (
        <Card className="p-4 mt-2">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-sm mt-2">Price: ${product.price}</p>
        </Card>
      );
    }

    if (message.type === 'supplier' && message.data) {
      const suppliers = Array.isArray(message.data) ? message.data : [message.data];
      const supplier = suppliers[0] as Supplier; // Type assertion since we know it's a Supplier
      return (
        <Card className="p-4 mt-2">
          <h3 className="font-semibold">{supplier.name}</h3>
          <p className="text-sm text-muted-foreground">{supplier.contactInfo}</p>
          <p className="text-sm mt-2">Categories: {supplier.productCategories.join(', ')}</p>
        </Card>
      );
    }

    return <p className="text-sm">{message.content}</p>;
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2 message-appear",
        message.isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          message.isBot
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {renderMessageContent()}
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};