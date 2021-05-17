import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import Graph from "./customClasses/graph";
import Node from "./customClasses/node";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    @ViewChild('canvas', { static: true })
    canvasRef: ElementRef<HTMLCanvasElement>;

    public title = 'build-test-nodes';
    public ctx: CanvasRenderingContext2D;
    public canvWidth: number;
    public canvHeight: number;
    public canvColor: string = '#484848';
    public fontColor: string = 'white';
    public font: string = '1.2em Arial';
    public circleBoarderColor: string = 'white';
    public regularCircleFillColor: string = '#000000';
    public pathCircleFillColor: string = '#008900';
    public userCommand: string = "";
    public graph = new Graph();
    public positions: number[][] = [
        [300, 270],
        [40, 40],
        [470, 520],
        [500, 100],
        [90, 550],
        [80, 300],
        [300, 60],
        [500, 330],
        [360, 550]
    ];
    public allNodes: Node[] = [];
    public connectedNodes: string[] = [];
    public connectionTestResult: string = "";

    public getCommandAndArgs(command: string) {
        let sepRegex = /\s+/;
        let commandArr: string[] = command.split(sepRegex);
        return commandArr;
    }

    private getNeighboursIndexes(node: Node): number[] {
        let indexes: number[] = [];
        for (let neighbour of node.getNeighboursIds()) {
            for (let i = 0; i < this.allNodes.length; i++) {
                if (this.allNodes[i].getId() === neighbour) {
                    indexes.push(i);
                }
            }
        }
        return indexes;
    }

    public drawEdgesAndNodes(): void {
        this.drawEdges();
        this.drawNodes();
    }

    public drawEdges(): void {
        this.clearCanvas();
        for (let i = 0; i < this.allNodes.length; i++) {
            let x: number, y: number;
            [x, y] = this.positions[i];
            let neighboursIndexes = this.getNeighboursIndexes(this.allNodes[i]);
            for (let j = 0; j < neighboursIndexes.length; j++) {
                let [neighbX, neighbY] = this.positions[neighboursIndexes[j]];
                this.drawLine(x, y, neighbX, neighbY);
            }
        }
    }

    public drawNodes(): void {
        for (let i = 0; i < this.allNodes.length; i++) {
            let x: number, y: number;
            [x, y] = this.positions[i];
            let regularNode: boolean = !this.connectedNodes.includes(
                this.allNodes[i].getId())
            this.drawCircleWithTextInside(x, y, this.allNodes[i].getId(),
                regularNode);
        }
    }

    private resetGraph(): void {
        alert("Too many nodes. Resetting graph");
        this.graph.resetGraph();
        this.allNodes = this.graph.getAllNodes();
        this.userCommand = "";
    }

    public displayConnectionTestResult(): void {
        if (this.connectedNodes.length === 0) {
            this.connectionTestResult = "connection not found";
        } else {
            let result: string = "";
            for (let i = 0; i < this.connectedNodes.length; i++) {
                result += this.connectedNodes[i];
                if (i !== (this.connectedNodes.length - 1)) {
                    result += " --> ";
                }
            }
            this.connectionTestResult = result;
        }
    }

    private processBuildingNodes(nodeAId: string, nodeBId: string): void {
        this.graph.createConnection(nodeAId, nodeBId);
        this.allNodes = this.graph.getAllNodes();
        if (this.allNodes.length > 8) {
            this.resetGraph();
        }
        this.connectedNodes = [];
        this.drawEdgesAndNodes();
        this.displayConnectionTestResult();
    }

    private processTestingConnection(nodeAId: string, nodeBId: string): void {
        this.connectedNodes = this.graph.getConnection(nodeAId, nodeBId);
        this.drawEdgesAndNodes();
        this.displayConnectionTestResult();
    }

    public processUserCommand() {

        console.log("processing user command");
        let command: string, nodeAId: string, nodeBId: string;
        [command, nodeAId, nodeBId] = this.getCommandAndArgs(this.userCommand);

        if (command.toLocaleLowerCase() === "b") {
            this.processBuildingNodes(nodeAId, nodeBId);
        } else if (command.toLocaleLowerCase() === "t") {
            this.processTestingConnection(nodeAId, nodeBId);
        } else {
            alert("incorrect command");
            this.userCommand = "";
        }
    }

    public clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight);
        this.ctx.fillStyle = this.canvColor;
        this.ctx.fillRect(0, 0, this.canvWidth, this.canvHeight);
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.circleBoarderColor;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    public drawText(text: string, x: number, y: number) {
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = this.fontColor;
        this.ctx.font = this.font;
        this.ctx.fillText(text, x, y);
    }

    public drawCircle(x: number, y: number, regularCircle: boolean = true) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = regularCircle
            ? this.regularCircleFillColor
            : this.pathCircleFillColor;
        this.ctx.fill();
        this.ctx.strokeStyle = this.circleBoarderColor;
        this.ctx.stroke();
    }

    public drawCircleWithTextInside(x: number, y: number, text: string,
        regularCircle: boolean = true) {
        this.drawCircle(x, y, regularCircle);
        this.drawText(text, x, y);
    }

    ngOnInit(): void {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        this.canvWidth = this.canvasRef.nativeElement.width;
        this.canvHeight = this.canvasRef.nativeElement.height;
        this.clearCanvas();
    }
}
