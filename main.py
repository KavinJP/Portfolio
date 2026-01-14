import random
import os
from enum import Enum
from dataclasses import dataclass
from typing import List, Tuple

class GameState(Enum):
    EXPLORING = 1
    BATTLE = 2
    MENU = 3
    GAME_OVER = 4

@dataclass
class Item:
    name: str
    item_type: str  # weapon, armor, potion
    value: int

@dataclass
class Enemy:
    name: str
    hp: int
    max_hp: int
    attack: int
    defense: int
    loot: List[Item]

class Player:
    def __init__(self, name: str):
        self.name = name
        self.level = 1
        self.exp = 0
        self.max_exp = 100
        self.hp = 100
        self.max_hp = 100
        self.attack = 10
        self.defense = 5
        self.gold = 50
        self.inventory: List[Item] = []
        self.equipped_weapon = None
        self.equipped_armor = None

    def take_damage(self, damage: int):
        mitigated = max(1, damage - self.defense // 2)
        self.hp -= mitigated
        return mitigated

    def gain_exp(self, amount: int):
        self.exp += amount
        if self.exp >= self.max_exp:
            self.level_up()

    def level_up(self):
        self.level += 1
        self.exp = 0
        self.max_exp = int(self.max_exp * 1.2)
        self.max_hp += 20
        self.hp = self.max_hp
        self.attack += 5
        self.defense += 2
        print(f"\n🎉 LEVEL UP! You are now level {self.level}")

    def heal(self, amount: int):
        self.hp = min(self.max_hp, self.hp + amount)

    def display_stats(self):
        print(f"\n{'='*50}")
        print(f"🧙 {self.name} | Level {self.level}")
        print(f"{'='*50}")
        print(f"HP: {self.hp}/{self.max_hp} | EXP: {self.exp}/{self.max_exp}")
        print(f"ATK: {self.attack} | DEF: {self.defense} | Gold: {self.gold}")
        print(f"{'='*50}\n")

class Battle:
    def __init__(self, player: Player, enemy: Enemy):
        self.player = player
        self.enemy = enemy
        self.round = 0

    def player_attack(self) -> int:
        damage = max(1, self.player.attack + random.randint(-5, 5))
        return damage

    def enemy_attack(self) -> int:
        damage = max(1, self.enemy.attack + random.randint(-3, 3))
        return damage

    def execute_round(self, player_action: int) -> bool:
        self.round += 1
        print(f"\n--- Round {self.round} ---")

        if player_action == 1:  # Attack
            damage = self.player_attack()
            self.enemy.hp -= damage
            print(f"⚔️  You attack for {damage} damage!")

        elif player_action == 2:  # Defend
            print("🛡️  You brace for impact...")

        elif player_action == 3:  # Potion
            self.player.heal(30)
            print("🧪 You drink a potion and restore 30 HP")

        # Enemy turn
        if self.enemy.hp > 0:
            enemy_damage = self.enemy_attack()
            if player_action == 2:
                enemy_damage = max(1, enemy_damage // 2)
            actual_damage = self.player.take_damage(enemy_damage)
            print(f"👹 {self.enemy.name} attacks for {actual_damage} damage!")

        print(f"Enemy HP: {max(0, self.enemy.hp)}/{self.enemy.max_hp}")
        print(f"Your HP: {self.player.hp}/{self.player.max_hp}")

        return self.enemy.hp > 0

    def show_options(self):
        print(f"\n👹 Facing: {self.enemy.name}")
        print("1. Attack  2. Defend  3. Use Potion  4. Flee")

class Game:
    def __init__(self):
        self.player = None
        self.state = GameState.MENU
        self.enemies_defeated = 0

    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')

    def main_menu(self):
        self.clear_screen()
        print("╔═══════════════════════════════════╗")
        print("║   🎮 DUNGEON CRAWLER RPGG 🎮      ║")
        print("╚═══════════════════════════════════╝")
        print("\n1. New Game\n2. Quit")
        choice = input("Select: ").strip()

        if choice == "1":
            name = input("Enter your character name: ").strip()
            self.player = Player(name)
            self.state = GameState.EXPLORING
        elif choice == "2":
            exit()

    def explore(self):
        self.clear_screen()
        self.player.display_stats()
        print("You wander through a dark dungeon...\n")
        print("1. Search for enemies")
        print("2. Rest (restore 50 HP)")
        print("3. View inventory")
        print("4. Return to menu")

        choice = input("Choice: ").strip()

        if choice == "1":
            self.encounter_enemy()
        elif choice == "2":
            self.player.heal(50)
            print("✨ You rest and feel refreshed!")
        elif choice == "3":
            self.show_inventory()
        elif choice == "4":
            self.state = GameState.MENU

    def encounter_enemy(self):
        enemies = [
            Enemy("Goblin", 30, 30, 8, 1, [Item("Rusty Sword", "weapon", 5)]),
            Enemy("Orc", 50, 50, 12, 3, [Item("Battle Axe", "weapon", 15)]),
            Enemy("Dragon", 100, 100, 20, 8, [Item("Dragon Scales", "armor", 25)]),
            Enemy("Skeleton", 35, 35, 10, 2, [Item("Bone Staff", "weapon", 10)])
        ]

        enemy = random.choice(enemies)
        print(f"\n⚠️  A wild {enemy.name} appears!")
        input("Press Enter to battle...")

        battle = Battle(self.player, enemy)

        while self.player.hp > 0 and enemy.hp > 0:
            battle.show_options()
            action = input("Action: ").strip()

            if action == "4":
                print("You flee!")
                return
            elif action in ["1", "2", "3"]:
                if not battle.execute_round(int(action)):
                    break
            else:
                print("Invalid action!")
                continue

            if self.player.hp <= 0:
                self.state = GameState.GAME_OVER
                return

        if enemy.hp <= 0:
            exp_gain = enemy.max_hp
            gold_gain = random.randint(10, 40)
            self.player.gain_exp(exp_gain)
            self.player.gold += gold_gain
            self.enemies_defeated += 1
            print(f"\n🎉 Victory! Gained {exp_gain} EXP and {gold_gain} Gold")

    def show_inventory(self):
        self.clear_screen()
        print("📦 Inventory:")
        if not self.inventory:
            print("Empty")
        else:
            for item in self.inventory:
                print(f"- {item.name} ({item.item_type})")
        input("\nPress Enter to continue...")

    def run(self):
        while True:
            if self.state == GameState.MENU:
                self.main_menu()
            elif self.state == GameState.EXPLORING:
                self.explore()
            elif self.state == GameState.GAME_OVER:
                self.clear_screen()
                print(f"💀 Game Over! You defeated {self.enemies_defeated} enemies.")
                print(f"Final Level: {self.player.level}")
                self.state = GameState.MENU

if __name__ == "__main__":
    game = Game()
    game.run()