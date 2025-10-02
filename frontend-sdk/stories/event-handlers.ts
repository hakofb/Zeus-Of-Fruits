/**
 * Event Handlers for Stake Engine Book Events
 * Maps Math SDK events to Frontend animations
 */

export interface BookEvent {
  type: string;
  [key: string]: any;
}

export class EventHandler {
  private eventQueue: BookEvent[] = [];
  private isProcessing: boolean = false;

  constructor(
    private onDrawBoard: (grid: string[][]) => void,
    private onMultiplierDrop: (multipliers: any[]) => void,
    private onSymbolWin: (wins: any[]) => void,
    private onScatterWin: (count: number, payout: number) => void,
    private onFreespinTrigger: (spinsAwarded: number) => void,
    private onPayout: (amount: number, bet: number) => void
  ) {}

  public processBookEvents(events: BookEvent[]): void {
    this.eventQueue = [...events];
    this.processNextEvent();
  }

  private async processNextEvent(): Promise<void> {
    if (this.isProcessing || this.eventQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const event = this.eventQueue.shift()!;

    switch (event.type) {
      case 'drawBoard':
        await this.handleDrawBoard(event);
        break;

      case 'multiplierDrop':
        await this.handleMultiplierDrop(event);
        break;

      case 'symbolWin':
        await this.handleSymbolWin(event);
        break;

      case 'scatterWin':
        await this.handleScatterWin(event);
        break;

      case 'freespinTrigger':
        await this.handleFreespinTrigger(event);
        break;

      case 'payout':
        await this.handlePayout(event);
        break;

      default:
        console.warn(`Unknown event type: ${event.type}`);
    }

    this.isProcessing = false;

    if (this.eventQueue.length > 0) {
      setTimeout(() => this.processNextEvent(), 100);
    }
  }

  private async handleDrawBoard(event: BookEvent): Promise<void> {
    console.log('Drawing board:', event.grid);
    this.onDrawBoard(event.grid);
    await this.delay(800);
  }

  private async handleMultiplierDrop(event: BookEvent): Promise<void> {
    console.log('Dropping multipliers:', event.multipliers);
    this.onMultiplierDrop(event.multipliers);
    await this.delay(1000);
  }

  private async handleSymbolWin(event: BookEvent): Promise<void> {
    console.log('Symbol wins:', event.wins);
    this.onSymbolWin(event.wins);
    await this.delay(1500);
  }

  private async handleScatterWin(event: BookEvent): Promise<void> {
    console.log('Scatter win:', event.count, event.payout);
    this.onScatterWin(event.count, event.payout);
    await this.delay(1000);
  }

  private async handleFreespinTrigger(event: BookEvent): Promise<void> {
    console.log('Free spins triggered:', event.spins_awarded);
    this.onFreespinTrigger(event.spins_awarded);
    await this.delay(2000);
  }

  private async handlePayout(event: BookEvent): Promise<void> {
    console.log('Final payout:', event.amount);
    this.onPayout(event.amount, event.bet);
    await this.delay(1000);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const sampleEvents = {
  baseGameWin: [
    {
      type: 'drawBoard',
      grid: [
        ['crown', 'cup', 'sword', 'ring', 'hourglass', 'yellow_gem'],
        ['crown', 'crown', 'sword', 'ring', 'hourglass', 'yellow_gem'],
        ['crown', 'cup', 'crown', 'crown', 'hourglass', 'yellow_gem'],
        ['crown', 'cup', 'sword', 'crown', 'crown', 'yellow_gem'],
        ['crown', 'cup', 'sword', 'ring', 'crown', 'crown']
      ]
    },
    {
      type: 'multiplierDrop',
      multipliers: [
        { position: { row: 0, col: 0 }, value: 5 },
        { position: { row: 3, col: 2 }, value: 10 }
      ]
    },
    {
      type: 'symbolWin',
      wins: [
        {
          symbol: 'crown',
          count: 12,
          payout: 45,
          positions: [
            { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: 1 },
            { row: 2, col: 0 }, { row: 2, col: 2 }, { row: 2, col: 3 },
            { row: 3, col: 0 }, { row: 3, col: 3 }, { row: 3, col: 4 },
            { row: 4, col: 0 }, { row: 4, col: 4 }, { row: 5, col: 4 }
          ]
        }
      ]
    },
    {
      type: 'payout',
      amount: 720,
      bet: 1
    }
  ],

  scatterTrigger: [
    {
      type: 'drawBoard',
      grid: [
        ['scatter', 'cup', 'sword', 'ring', 'hourglass', 'yellow_gem'],
        ['blue_gem', 'scatter', 'sword', 'ring', 'hourglass', 'yellow_gem'],
        ['green_gem', 'cup', 'scatter', 'ring', 'hourglass', 'yellow_gem'],
        ['red_gem', 'cup', 'sword', 'scatter', 'hourglass', 'yellow_gem'],
        ['purple_gem', 'cup', 'sword', 'ring', 'hourglass', 'yellow_gem']
      ]
    },
    {
      type: 'scatterWin',
      count: 4,
      payout: 2
    },
    {
      type: 'freespinTrigger',
      spins_awarded: 15
    },
    {
      type: 'payout',
      amount: 2,
      bet: 1
    }
  ]
};
