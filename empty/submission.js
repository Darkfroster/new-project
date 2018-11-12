/*jshint undef: false*/
// File submission.js: CS1101S Practical Exam

// Matriculation number:

// submit this file to IVLE folder "Practical Exam Submission"
// in workbin "CS1101S Practical Exam 2012" when done

// //////////////////////
// Task 1: Bar codes
// //////////////////////

// Feel free to use encoding_key to represent the given encoding keys:
// encoding_key[d] returns the encoding key that belongs to digit d.

////////////////////////or///////////////////////
function remove_specified_element_from_tail(xs, i) {
    example2 = remove_all(list_ref(xs, i + 1), xs);
    return (length(xs) < i + 2)
        ? NaN
        : list_ref(xs, i + 1);
}

// see file task_2_testing.js for test cases

// Task 2 C

function sorted_stack(is) {
    var stack = new Stack();
    var the_list = pair(NaN, is);
    while (!is_empty_list(tail(the_list))) {
        stack.push(remove_specified_element_from_tail(
                        the_list,
                        index_of_largest(tail(the_list))));
    }
    return stack;
}

// see file task_2_testing.js for test cases

// Task 2 D

function stack_to_list(stack) {
    if (stack.is_empty()) {
        return [];
    } else {
        var first = stack.pop();
        var rest = stack_to_list(stack);
        return pair(first, rest);
    }
}

// see file task_2_testing.js for test cases

// Task 2: General testing

function sort(is) {
    return stack_to_list(sorted_stack(is));
}

// see file task_2_testing.js for test cases

// //////////////////////
// Task 3: Knightly moves
// //////////////////////

// Task 3 A

function Coordinates(x, y) {
    this.x = x;
    this.y = y;
}

Coordinates.prototype.get_x = function() {
    return this.x;
};

Coordinates.prototype.get_y = function() {
    return this.y;
};

// see file task_3_testing.js for test cases

// Task 3 B

// use two-dimensional array 
// for representing the chess board

function Board() {
    this.board = [];
    var i = 0;
    while (i < 8) {
        this.board[i] = [];
        var j = 0;
        while (j < 8) {        
            this.board[i][j] = false;
            j = j + 1;
        }
        i = i + 1;
    }
}

/*
// using the for loop from Lecture 21:

function Board() {
    this.board = [];
    for (var i = 0; i < 8; i++) {
        this.board[i] = [];
        for (var j = 0; j < 8; j++) {
            this.board[i][j] = false;
	}
    }
}
*/

// collect the reachable coordinates
// using a while loop

Board.prototype.get_reachables =
    function() {
        var cs = [];
        var i = 0;
        while (i < 8) {
            var j = 0;
            while (j < 8) {        
                if (this.board[i][j]) {
                    cs = pair(new Coordinates(i,j),cs);
                } else {
                    // don't do anything
                }
                j = j + 1;
            }
            i = i + 1;
        }
        return cs;
    }

/*
// using the for loop from Lecture 21

Board.prototype.get_reachables =
    function() {
        var cs = [];
	for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.board[i][j]) {
                    cs = pair(new Coordinates(i,j),cs);
                }
 	    }
        }
    }
*/
        
Board.prototype.set_reachable =
    function(c) {
        this.board[c.get_x()][c.get_y()] = true;
        return undefined;
    }

Board.prototype.set_reachable_by_knight_at = 
    function(c) {
        var x = c.get_x();
        var y = c.get_y();
        var self = this;
        for_each(
            function(dx) {
                for_each(
                    function(dy) {
                        if (Math.abs(dx*dy) === 2) {
                            var new_x = x + dx;
                            var new_y = y + dy;
                            if (new_x >= 0 && new_y >= 0 &&
                                new_x < 8 && new_y < 8) {
                                self.board[new_x][new_y] = true;
                            } else {
                                // don't do anything
                            }                                
                        } else {
                            // don't do anything
                        }
                    },
                    list(-2,-1,1,2)
                );
            },
            list(-2,-1,1,2)
        );
        return undefined;
    }

// see file task_3_testing.js for test cases

// Task 3 C

function knight(c, n) {
    var b = new Board();

    // set knight's initial position as reachable
    b.set_reachable(c);

    while (n > 0) {
        var newboard = new Board();
        for_each(function(pos){
            newboard.set_reachable_by_knight_at(pos);
        }, b.get_reachables());

        n = n - 1;
        b = newboard;
    }
    return b.get_reachables();
}

// see file task_3_testing.js for test cases

// ///////////////////////////
// Task 4: Catch me if you can
// ///////////////////////////

function catch_me(to_find, a) {
    var n = a.length;
    function find_col(y, x) {
        if (x < 0 || y >= n) {
            return false;
        }
        
        if (a[y][x] === to_find) {
            return true;
        } else if (a[y][x] > to_find) {
            return find_col(y, x-1);
        } else {
            return find_col(y+1, x);
        }
    }
    return find_col(0, n-1);
}

// see file task_4_testing.js for test cases

