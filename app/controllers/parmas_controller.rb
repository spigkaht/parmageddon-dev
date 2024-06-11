class ParmasController < ApplicationController
  def index
    @parma = Parma.all
  end
end
