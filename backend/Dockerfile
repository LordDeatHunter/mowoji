# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ ./
RUN go build -o server ./cmd/server

# Final stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/server .

EXPOSE 6969

CMD ["./server"]
