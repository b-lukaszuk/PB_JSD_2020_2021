# Task 1

You have been giving a task of building and testing a network. You are receiving commands and should execute them in order they have been send. The commands are made from three elements. Operation B – build connection, T – test if connection exists and give information as true or false. The two last elements are two IP addresses. Start IP and end IP. 

<pre>
[
	"B 100.100.100.1 100.100.100.2",
	"B 100.100.100.1 100.100.100.3",
	"B 100.100.100.10 100.100.100.11",
	"T 100.100.100.1 100.100.100.3",
	"T 100.100.100.10 100.100.100.2",
	"T 100.100.100.10 100.100.100.11",
	"B 100.100.100.11 100.100.100.2",
	"T 100.100.100.10 100.100.100.3",
	"T 100.100.100.100 100.100.100.103",
]
</pre>

# Task 2 Exam

Implement:  https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
