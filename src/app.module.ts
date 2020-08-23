import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import AuthModule from './infrastructure/ui/auth/auth.module';
import UsersModule from './infrastructure/ui/users/users.module';
import PrismaModule from './infrastructure/persistance/prisma/prisma.module';
import GraphqlOptions from './graphql.options';
import CurrenciesModule from './infrastructure/ui/currencies/currencies.module';
import TransactionCategoriesModule from './infrastructure/ui/transactionCategories/transactionCategories.module';
import TransactionsModule from 'infrastructure/ui/transactions/transactions.module';

/* TODO: анализ логики на соответствие GRASP:
1. Information Expert - данные должны обрабатываться где они хранятся,
а не на классе высшего уровня композицци сочетать логику подклассов:
public class Client {
  private int getOrderPrice(Order order) {
    List<OrderItem> orderItems = order.getOrderItems();

    int result = 0;

    for (OrderItem orderItem : orderItems) {
        int amount = orderItem.getAmount();

        Good good = orderItem.getGood();
        int price = good.getPrice();

        result += price * amount;
    }

    return result;
  }
} to
public class Order {
    private List<OrderItem> orderItems;
    private String destinationAddress;
    
    public int getPrice() {
        int result = 0;
        
        for(OrderItem orderItem : orderItems) {
            result += orderItem.getPrice();
        }
        
        return result;
    }
}
public class OrderItem {
    private Good good;
    private int amount;

    public int getPrice() {
        return amount * good.getPrice();
    }
}
public class Good {
    private String name;
    private int price;
}
public class Client {
    public void doSmth() {
        Order order = new Order(new ArrayList<>(), "");
        order.getPrice();
    }
}
2. создавать экземпляры класса должен класс, которому они нужны
public class Client {
    public void doSmth() {
        Good good = new Good("name", 2);
        OrderItem orderItem = new OrderItem(good, amount);
        List<OrderItem> orderItems = new ArrayList<>();
        orderItems.add(orderItem);
        Order order = new Order(orderItems, "abc");
        // client code 
    }
} to
public class Client {
    public void doSmth() {
        Order order = new Order("address");
        order.addOrderItem(amount, name, price);
        // client code 
    }
}
4. слабое зацепление
5. высокая связность
8. посредник (mediator), после фасада
*/
// TODO: нужен ли фасад (который должен быть синглтоном) и посредник (особенно при разбитии на микросервисы)?
// TODO: кеширование для избежания N+1
@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: GraphqlOptions,
    }),
    UsersModule,
    CurrenciesModule,
    TransactionCategoriesModule,
    TransactionsModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export default class AppModule {}
