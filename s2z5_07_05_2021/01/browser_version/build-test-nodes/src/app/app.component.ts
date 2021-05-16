import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

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
    public pathCircleFillColor: string = '#31ce31';

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
        this.drawLine(100, 100, 300, 200)
        this.drawCircleWithTextInside(100, 100, "a");
        this.drawCircleWithTextInside(300, 200, "b");
    }
}
