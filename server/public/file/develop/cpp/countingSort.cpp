#include <iostream>
#include <vector>
#include <math.h>
#include <time.h>
using namespace std;

// Node class for linked list
class Node {
public:
    int data;
    Node* next;
};

// Function to add a new node to the front of the linked list
void push(Node** head_ref, int new_data) {
    Node* new_node = new Node();
    new_node->data = new_data;
    new_node->next = (*head_ref);
    (*head_ref) = new_node;
}

// Function to perform count sort on the linked list
void countSort(Node** head_ref) {
    // Find the maximum value in the linked list
    int max_value = INT_MIN;
    Node* current = (*head_ref);
    while (current != NULL) {
        if (current->data > max_value) {
            max_value = current->data;
        }
        current = current->next;
    }
    
    // Initialize count array and output array
    vector<int> count(max_value+1, 0);
    vector<int> output;
    
    // Count the number of occurrences of each value in the linked list
    current = (*head_ref);
    while (current != NULL) {
        count[current->data]++;
        current = current->next;
    }
    
    // Add each value to the output array the number of times it occurs in the linked list
    for (int i = 0; i <= max_value; i++) {
        for (int j = 0; j < count[i]; j++) {
            output.push_back(i);
        }
    }
    
    // Update the linked list with the sorted values
    current = (*head_ref);
    for (int i = 0; i < output.size(); i++) {
        current->data = output[i];
        current = current->next;
    }
}

// Function to print the linked list
void printList(Node* head) {
    Node* current = head;
    while (current != NULL) {
        cout << current->data << " ";
        current = current->next;
    }
    cout << endl;
}

// Driver code
int main() {
    clock_t executionTime = clock();

    // Create a linked list and add some values
    Node* head = NULL;
    int n = 1000;
    for(int i=0;i<n;i++){
        int ran = rand() % n;
        push(&head, ran);
    }
    
    // Print the unsorted linked list
    cout << "Unsorted linked list: \n\t";
    printList(head);
    
    // Perform count sort on the linked list
    clock_t computationTime = clock();
    countSort(&head);
    double computation = computationTime;
    
    // Print the sorted linked list
    cout << "Sorted linked list: \n\t";
    printList(head);

    // Print the execution,Computation time
    printf("Total computation time: %.0f μs\n", (double)(clock() - computation)*1000);
    printf("Sequential execution time: %.0f μs\n", (double)(clock() - executionTime)*1000);
    return 0;
}