defmodule Totes.McStack do
  use GenServer                      

  @doc """
   When you call the :pop action it returns the first element in the array

   Returns `:hello`.

   ## Examples

       iex -S mix
       iex> { :ok, pid } = GenServer.start_link(Totes.McStack, [:hello, :world, "Awesome!"])
       iex> GenServer.call(pid, :pop)
       :hello
       iex> GenServer.cast(pid, {:push, "hai"})
       :ok
       iex> :sys.get_status pid
   """
  def handle_call(:pop, _from, stack) when stack == [] do        
    { :reply, :empty, [] }
  end
  
  def handle_call(:pop, _from, stack) do
    [ head|tail ] = stack
    { :reply, head, tail }
  end
  
  def handle_cast({:push, value}, stack) do
    stack = [value | stack]
    { :noreply, stack }
  end
end
