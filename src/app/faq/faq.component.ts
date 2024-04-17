// faq.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs = [
    {
      question: 'What is Food Order Pro?',
      answer: 'Food Order Pro is an advanced digital ordering system used within restaurants to enhance dining experiences by minimizing wait times.',
      active: true,
      disabled: false
    },
    {
      question: 'How do I place an order on Food Order Pro?',
      answer: 'To place an order, simply browse our menu, add items to your cart, and proceed to checkout. You can review your order before confirming and making a payment.',
      active: false,
      disabled: false
    },
    {
      question: 'Is there a tutorial on how to use the ordering system?',
      answer: 'Yes, we offer a user-friendly tutorial that guides you through the ordering process. You can access it from the Help section in the main menu.',
      active: false,
      disabled: false
    },
    {
      question: 'How can I create an account on Food Order Pro?',
      answer: 'Creating an account is easy! Click on the "Register" button on the top right corner, fill out your details, and submit. You’ll be ready to place orders in no time.',
      active: false,
      disabled: false
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'If you forget your password, click on the "Forgot Password" link on the login page and follow the instructions to reset your password.',
      active: false,
      disabled: false
    },
    {
      question: 'Can I save my favorite orders?',
      answer: 'Absolutely! Once you create an account, you can save your favorite orders for quick and easy reordering in the future.',
      active: false,
      disabled: false
    },
    // add more FAQs as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
