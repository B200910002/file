import sys
import math

class Object:
    pass

class Light(Object):
    def __init__(self, X, Y):
        self.X = X
        self.Y = Y

class Agent(Object):
    def __init__(self):
        def program(percept):
            pass
        
        self.program = program

    def sense(self, env):
        self.percept = env.getPercept(self)

    def do(self, command):
        pass

    def run(self, env):
        self.sense(env)
        command = self.program(self.percept)
        self.do(command)

class ThorAgent(Agent):
    def __init__(self, X, Y):
        Agent.__init__(self)
        self.X = X
        self.Y = Y

        def program(percept):
            light_x, light_y = percept

            direction = ""

            if self.Y > light_y:
                direction = direction + "N"
            elif self.Y < light_y:
                direction = direction + "S"

            if self.X > light_x:
                direction = direction + "W"
            elif self.X < light_x:
                direction = direction + "E"

            return direction
        

        self.program = program

    def do(self, command):
        print(command)

        if "N" in command:
            self.Y -= 1
        elif "S" in command:
            self.Y += 1

        if "E" in command:
            self.X += 1
        elif "W" in command:
            self.X -= 1

class SmartThorAgent(ThorAgent):
    def __init__(self, X, Y):
        ThorAgent.__init__(self, X, Y)

    def program(self, percept):
        light_x, light_y = percept

        # compute the direction to move in
        dx = light_x - self.X
        dy = light_y - self.Y
        if dx > 0:
            direction = "E" * dx
        elif dx < 0:
            direction = "W" * abs(dx)
        else:
            direction = ""

        if dy > 0:
            direction += "S" * dy
        elif dy < 0:
            direction += "N" * abs(dy)

        return direction

class Environment:
    def __init__(self, thor, light):
        self.thor = thor
        self.light = light

    def getPercept(self, agent):
        if isinstance(agent, ThorAgent):
            return self.light.X, self.light.Y

    def run(self):
        # game loop
        
        while True:
            self.remaining_turns = int(input()) # The remaining amount of turns Thor can move. Do not remove this line.
            self.thor.run(self)

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.
# ---
# Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.

# light_x: the X position of the light of power
# light_y: the Y position of the light of power
# initial_tx: Thor's starting X position
# initial_ty: Thor's starting Y position
light_x, light_y, initial_tx, initial_ty = [int(i) for i in input().split()]

thor = SmartThorAgent(initial_tx, initial_ty)
light = Light(light_x, light_y)
env = Environment(thor, light)
env.run()